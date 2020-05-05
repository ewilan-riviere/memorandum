<template>
    <div class="badges-section">
        <span
            v-for="(dependency, dependencyId) in dependencies"
            :key="dependencyId"
            class="badge"
        >
            <a :href="dependency.link" target="_blank">
                <img :src="`https://img.shields.io/static/v1?label=${dependency.language}&message=v${dependency.version}&color=${dependency.color}&style=flat-square&logo=${dependency.logo}&logoColor=${dependency.color}`" :alt="dependency.language">
            </a>
        </span>
    </div>
</template>

<script>
import dependenciesJSON from './dependencies.json'

export default {
    name: 'dependencies',
    /**
     * Usage of props
     * 
     * data prop
     * just with languages (minimum required)
     * <dependencies :data='[["NuxtJS"],["BootstrapVue"]]'></dependencies>
     * 
     * with version (optional)
     * <dependencies :data='[["NuxtJS","2.11"],["BootstrapVue","2.1"]]'></dependencies>
     * 
     * if language don't exist into dependencies.json, infos will be limited, if you want some infos, add it
     */
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        /**
         * Convert data prop into array of objects and inject dependencies.json infos into this array
         */
        convertData() {
            let dependenciesFromProp = this.data
            let dependenciesObjects = []
            // take prop array and convert it to object
            dependenciesFromProp.forEach(dependency => {
                let dependencyObject = Object.assign({}, [dependency][0])
                dependenciesObjects.push(dependencyObject)
            })
            // rename first key into "language" and second key into "version" if version is set
            var i;
            for(i = 0; i < dependenciesObjects.length; i++){
                const depArray = dependenciesObjects[i]
                depArray.language = depArray['0'];
                delete depArray['0'];
                if (depArray['1'] !== undefined) {
                    depArray.version = depArray['1'];
                    delete depArray['1'];
                }
            }
            // compare data with JSON database to get static infos
            dependenciesObjects = this.injectJsonInfo(dependenciesObjects, dependenciesJSON)
            return dependenciesObjects
        },
        /**
         * Inject dependencies.json infos into this array
         * @param propsArray Array from props
         * @param JsonData JSON data with all available languages
         */
        injectJsonInfo(propsArray, JsonData) {
            var depenciesWithData = [];
            // compare with "language" key
            for(var language in propsArray) {
                const currentLang = propsArray[language].language
                // check if language exist in JsonData
                if (JsonData[currentLang] !== undefined) {
                    // get current language
                    if(currentLang === JsonData[currentLang].language) {
                        let depedencyFromJson = {}
                        // set depedencyFromJson with JSON data
                        depedencyFromJson = JsonData[currentLang]
                        // if "version" is set, get prop "version" data
                        if ('version' in propsArray[language]) {
                            delete depedencyFromJson.version
                            depedencyFromJson["version"] = propsArray[language].version
                        } else {
                            depedencyFromJson["version"] = depedencyFromJson.version;
                        }
                        // inject new object into depenciesWithData
                        depenciesWithData.push(depedencyFromJson)
                    }
                // otherwise attribute basic info to language
                // you can add your language to dependencies.json if you want infos about it
                } else {
                    let undefinedLang = {}
                    undefinedLang["language"] = propsArray[language].language
                    undefinedLang["logo"] = null
                    undefinedLang["link"] = null
                    undefinedLang["color"] = '000000'
                    undefinedLang["colorIcon"] = '000000'
                    if ('version' in propsArray[language]) {
                        undefinedLang["version"] = propsArray[language].version
                    } else {
                        undefinedLang["version"] = 0;
                    }
                    depenciesWithData.push(undefinedLang)
                }
            }
            return depenciesWithData;
        }
    },
    data() {
        return {
            dependencies: this.convertData()
        }
    }
}
</script>

<style lang="scss" scoped>
.badges-section {
    margin: 0.3rem 0;
}
.badge {
    padding-right: 0.2rem;
}
</style>