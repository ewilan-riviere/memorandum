---
title: Dynamic Routing
description: 'To add the functionality where a user can click'
position: 6
---

In this lesson, we’re going to add the functionality where a user can click any of the **EventCard**s that are displayed on our homepage and be routed to a view that shows more details about that event. In other words: we’re going to implement some dynamic routing behavior. We’ll tackle this new feature in two parts.

---

## Part 1: What we’ll achieve

* Create a new **EventDetails** component to display the event’s details
* Add a new API call to fetch a single event by its id (this is the event we’ll display the details of)
* Add a route for the new **EventDetails** component
* Make **EventCard** clickable so we can access this new **EventDetails** route

---

## Create EventDetails Component

First up, we’ll create the component to display the event details, adding it to our **views** directory.

**📁src/views/EventDetails.vue**

```html
<template>
    <div>
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                event: null
            }
        },
        created() {
            // fetch event (by id) and set local event data
        }
    }
</script>
```

It renders out the details from the `event` in our data. That event is retrieved from an API call that fetches it, by its id. Let’s revisit our mock database to see how to fetch it.

---

## Add API call to fetch event by id

Notice what happens when we call up our my-json-server url, this time with an id at the end of it (_…/events/123_). This targets a single event, where its `id` matches the end of our url: `123`.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1607454318295.jpg?alt=media&token=a7fd9f52-2983-4404-ab49-c2451db7197b](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1607454318295.jpg?alt=media&token=a7fd9f52-2983-4404-ab49-c2451db7197b)

This is the kind of url we’ll use when fetching a single event, where it ends with the event’s id. Let’s head into our **EventService** file and add that API call now.

**📁src/services/EventService.js**

```javascript
import axios from 'axios'

const apiClient = axios.create({
baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
withCredentials: false,
headers: {
Accept: 'application/json',
'Content-Type': 'application/json'
}
})

export default {
getEvents() {
return apiClient.get('/events')
},
//Added new call
getEvent(id) {
return apiClient.get('/events/' + id)
}
}
```

The `getEvent` call is very similar to the `getEvents` one from the last lesson. However, it takes in an `id` as its argument, which is appended to the end of the url we’re making a `get` request to.

Now that the call is ready to use, let’s use it within our new **EventDetails** component.

**📁src/components/EventDetails.vue**

```html
<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    </div>
</template>

<script>
    import EventService from '@/services/EventService.js'
    export default {
        data() {
            return {
                event: null,
                id: 123
            }
        },
        created() {
            EventService.getEvent(this.id)
                .then(response => {
                    this.event = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
</script>
```

A few things to note here:

* We are calling `getEvent` from the **EventService**, which we’ve now imported into the component
* We’re passing in `this.id` - That `id` is currently just a hard-coded data value. (We’ll make this dynamic in part 2 of this lesson. This is not our ultimate solution.)
* We’re setting our local `event` data equal to the response of our `getEvent` request

Now that this component is making a call out for a single event to display, we can add this component to our routes.

---

## Add EventDetails as a route

We’ll head into our router file, import **EventDetails**, and add it to our `routes` array:

**📁src/router/index.js**

```javascript
...
import EventDetails from '@/views/EventDetails.vue'
import About from '@/views/About.vue'

const routes = [
...
{
path: '/event/123',
name: 'EventDetails',
component: EventDetails
},
...
]
```

For now, we’ll just hard-code the path: `'/event/123'`. Eventually, the end part (`123`) will be dynamic, and updated with the id of the event that is currently being displayed.

Now that we have this new route, we need to be able to access it. Again, we’re wanting to access this route whenever we click on one of the **EventCards** on our homepage.

---

## Make EventCard clickable with a router-link

Heading into the **EventCard** component, let’s wrap our template code in a `router-link`

**📁src/components/EventCard.vue**

```html
<template>
    <router-link to="event/123">
        <div class="event-card">
            <span>@{{ event.time }} on {{ event.date }}</span>
            <h4>{{ event.title }}</h4>
        </div>
    </router-link>
</template>
```

Now, when one of our EventCards is clicked, we’ll be routed to the new path `event/123`.

---

If we check this out in the browser, we’ll see that it’s working so far… When we click on the Cat Adoption Day **EventCard**, we’re taken to a view that displays the details of that event.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F2.opt.1607454318296.jpg?alt=media&token=0e14015f-8869-48f3-a8a0-643f627bdaa6](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F2.opt.1607454318296.jpg?alt=media&token=0e14015f-8869-48f3-a8a0-643f627bdaa6)

However, if we click on any other **EventCard**, we’re still pulling up the same Cat Adoption Day details, and the id at the end of our url is the same: 123. That’s expected, since we hardcoded the id we are passing into the `getEvent` call, and in the path of the EventDetails route.

This brings us to the end of Part 1 and to the beginning of Part 2, where we make this routing behavior dynamic so we can route to the details of any **EventCard** we click on.

---

---

## Part 2: Making it Dynamic

To make our routing behavior dynamic, we need to switch out the hard-coded id in our path (`/123`) and replace it with a **dynamic segment**. This is basically a variable _parameter_ for the url path, which gets updated with the id of whichever event is currently displayed on that route.

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F3.opt.1607454330988.jpg?alt=media&token=fd633c86-129f-41be-9526-214d044b37a8](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F3.opt.1607454330988.jpg?alt=media&token=fd633c86-129f-41be-9526-214d044b37a8)

We’ll then want to be able to feed that dynamic segment into the **EventDetails** component as a prop to be used when making the `getEvent` call.

---

## Add a dynamic segment to EventDetails route

Let’s get started, and add a dynamic segment to the path of the EventDetails route.

**📁src/router/index.js**

```javascript
{
path: '/event/:id',
name: 'EventDetails',
props: true,
component: EventDetails
},
```

Notice how the syntax for a dynamic segment begins with a colon `:` and is followed by whatever you want to call the segment. In this case, it’s `:id` since it gets replaced with our event’s id. In another use case, this could be something like `:username` or `:orderNumber`.

We’ve also added `props: true` here to give the **EventDetails** component access to this dynamic segment parameter as a prop.

Since we’ve updated the path in this route, the path in the `to` attribute of our **EventCard**’s attribute now needs to be updated. Remember, it’s currently hardcoded as `to="event/123"`

📁**src/components/EventCard.vue**

```html
<template>
    <router-link to="event/123">
        <div class="event-card">
            <span>@{{ event.time }} on {{ event.date }}</span>
            <h4>{{ event.title }}</h4>
        </div>
    </router-link>
</template>
```

A cleaner solution here would be to simply use a **named route**, where we bind `:to` an object that specifies which route this link routes to.

📁**src/components/EventCard.vue**

```html
<router-link :to="{ name: 'EventDetails' }">
```

---

💡**Relevant Tangent**: Now, we’ve also made our app a bit more scalable. In a bigger app with `router-links` throughout it, it becomes unnecessarily strenuous to maintain the paths in each `router-link` whenever they need to change. On the other hand, if your `router-links` used **named routes**, and your route’s path needs to change, you can simply change it once in the router file, and none of your `router-links` need to be updated since they aren’t relying on the path itself.

---

## Add event id to router’s parameters

At this point you might be wondering how we tell our dynamic `:id` segment what value it needs to be replaced by. We can do so by adding the `params` property onto our object here in the `to` attribute:

📁**src/components/EventCard.vue**

```html
<template>
    <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
        <div class="event-card">
            <span>@{{ event.time }} on {{ event.date }}</span>
            <h4>{{ event.title }}</h4>
        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            event: {
                type: Object,
                required: true
            }
        }
    }
</script>
```

Remember from a few lessons ago, this component has the `event` as a prop, so we can grab `event.id` from it and set the params `id` equal to it.

```html
<router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
```

Now, when we click on this `router-link`, we’re routed to **EventDetails** and the route’s path is appended with the event’s id.

We can now finally feed that id param into the EventDetails component as a prop.

📁**src/components/EventDetails.vue**

```html
<script>
    import EventService from '@/services/EventService.js'
    export default {
        props: ['id'],
        data() {
            return {
                event: null
            }
        },
        created() {
            EventService.getEvent(this.id)
                .then(response => {
                    this.event = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
</script>
```

Now, when we say `getEvent(this.id)`, we’re referring to the newly added `id` prop. When **EventDetails** is routed to and thus _created_, it now makes a request for the event with the id that is found in the dynamic parameter of the route’s path.

---

## We’re almost there

If we check this out in the browser, we’re successfully able to click on an **EventCard** and display the proper details for that event. Great job following along this far, we’re almost to the end. If we pop open our developer console however, we’ll see an error:

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F4.opt.1607454340025.jpg?alt=media&token=5d6d7825-6fff-4a5f-9ef9-3cb3b80b3e26](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F4.opt.1607454340025.jpg?alt=media&token=5d6d7825-6fff-4a5f-9ef9-3cb3b80b3e26)

What’s happening here is that **EventDetails** is trying to display the event’s details before it has received the event back from the API call. We need to tell our component to wait until it has the event before trying to display its details. Fortunately, that is a very simple fix.

📁**src/components/EventDetails.vue**

```html
<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    </div>
</template>
```

By adding a simple `v-if="event"` on our div here, we can make sure it only renders when the `event` exists in our data.

---

## Cleaning up our Code

With that, we’ve finished our dynamic routing behavior. Now, I just want to clean a few things up before we end.

First, our _EventCards_ don’t look as nice now that they’re wrapped with a `router-link`

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F5.opt.1607454355532.jpg?alt=media&token=1e1de1f2-4e27-458d-b442-8c442897728f](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F5.opt.1607454355532.jpg?alt=media&token=1e1de1f2-4e27-458d-b442-8c442897728f)

Let’s add an `event-link` class to the `router-link` to make it look nicer:

```html
<template>
    <router-link class="event-link" :to="{ name: 'EventDetails', params: { id: event.id } }">
        <... </router-link>
</template>

<style scoped>
    ... .event-link {
        color: #2c3e50;
        text-decoration: none;
    }
</style>
```

![https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F6.opt.1607454355533.jpg?alt=media&token=e5d751eb-c945-4298-b41c-bb0585175ee6](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F6.opt.1607454355533.jpg?alt=media&token=e5d751eb-c945-4298-b41c-bb0585175ee6)

---

For consistency’s sake, we can also update the **App.vue** file to use _named routes_ instead of hardcoded paths.

**App.vue**

```html
<div id="nav">
    <router-link :to="{ name: 'EventList' }">Events</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link>
</div>
```

Again, this helps build in scalability to the maintenance of our app’s routes.

---

## Next steps

To continue learning about concepts like route params and other Vue Router topics, you can check out our entire [Touring Vue Router](https://www.vuemastery.com/courses/touring-vue-router/receiving-url-parameters) course.

In the next lesson, we’re going to learn how to take our app and deploy it into production, using [Render](https://render.com/).
