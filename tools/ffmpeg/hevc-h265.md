---
title: HEVC H.265
---

# HEVC H.265

High Efficiency Video Coding (HEVC), also known as H.265 and MPEG-H Part 2, is a video compression standard designed as part of the MPEG-H project as a successor to the widely used Advanced Video Coding (AVC, H.264, or MPEG-4 Part 10). In comparison to AVC, HEVC offers from 25% to 50% better data compression at the same level of video quality, or substantially improved video quality at the same bit rate. It supports resolutions up to 8192×4320, including 8K UHD, and unlike the primarily 8-bit AVC, HEVC's higher fidelity Main 10 profile has been incorporated into nearly all supporting hardware. (Source: [Wikipedia](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding))

## Command

To reduce the file size of an MKV video file and convert it to the H.265 (x265) codec using FFmpeg, you can use the following command:

```sh
ffmpeg -y -i input.mkv -c:v libx265 -hide_banner -loglevel info -preset fast -crf 23 -map 0:v:0 -c:a aac -b:a 256k -map 0:a -map 0:s? -c:s copy output.mkv
```

- Documentation H265: <https://trac.ffmpeg.org/wiki/Encode/H.265>
- Documentation H264: <https://trac.ffmpeg.org/wiki/Encode/H.264> (some options are same)

Here's what each part of the command does:

- `-y`: This automatically overwrites the output file if it already exists.

- `-i input.mkv`: This specifies the input MKV file.

- `-c:v libx265`: This selects the H.265 (x265) video codec for compression.

- `-hide_banner -loglevel info`: This hides the FFmpeg banner and only shows the encoding progress. You can remove this if you want to see the banner and encoding information.

- `-preset fast`: This sets the x265 encoding preset to "fast," for encoding speed and compression efficiency. A slower preset will provide better compression (compression is quality per filesize). This means that, for example, if you target a certain file size or constant bit rate, you will achieve better quality with a slower preset.

- `-crf 23`: This sets the Constant Rate Factor (CRF), which determines the video quality. A lower value will result in higher quality but larger file size, and a higher value will reduce quality but result in a smaller file size. You can adjust this value to your desired trade-off between quality and size. Values range from 0 to 51, with 0 being lossless, 23 being the default, and 51 being the worst quality possible.

- `-map 0:v:0`: This selects the first video stream from the input file.

- `-c:a aac -b:a 256k`: This selects the AAC audio codec for compression and sets the audio bitrate to 256Kbps.

- `-map 0:a`: This selects all audio streams from the input file.

- `-map 0:s?`: This selects all subtitle streams from the input file, if any.

- `output.mkv`: This specifies the output file name.

After running this command, FFmpeg will encode the input MKV file using the x265 codec with the specified settings, resulting in a smaller MKV file size while retaining acceptable video and audio quality.

### Reduce file size

To reduce file size, you can change `crf` value to `28` or `30`, but the quality will be lower.

The range of the CRF scale is 0–51, where 0 is lossless (for 8 bit only, for 10 bit use -qp 0), 23 is the default, and 51 is worst quality possible. A lower value generally leads to higher quality, and a subjectively sane range is 17–28. Consider 17 or 18 to be visually lossless or nearly so; it should look the same or nearly the same as the input but it isn't technically lossless.

The range is exponential, so increasing the CRF value +6 results in roughly half the bitrate / file size, while -6 leads to roughly twice the bitrate.

Choose the highest CRF value that still provides an acceptable quality. If the output looks good, then try a higher value. If it looks bad, choose a lower value.

### Accelerate encoding

To accelerate encoding, you can change `preset` value to `ultrafast`, but the file size will be bigger.

A preset is a collection of options that will provide a certain encoding speed to compression ratio. A slower preset will provide better compression (compression is quality per filesize). This means that, for example, if you target a certain file size or constant bit rate, you will achieve better quality with a slower preset. Similarly, for constant quality encoding, you will simply save bitrate by choosing a slower preset.

Use the slowest preset that you have patience for. The available presets in descending order of speed are:

- `ultrafast`
- `superfast`
- `veryfast`
- `faster`
- `fast`
- `medium` – default preset
- `slow`
- `slower`
- `veryslow`
- `placebo` – ignore this as it is not useful (see FAQ)

You can see a list of current presets with `-preset help`.

### Tune

You can optionally use `-tune` to change settings based upon the specifics of your input. Current tunings include:

- `film` – use for high quality movie content; lowers deblocking
- `animation` – good for cartoons; uses higher deblocking and more reference frames
- `grain` – preserves the grain structure in old, grainy film material
- `stillimage` – good for slideshow-like content
- `fastdecode` – allows faster decoding by disabling certain filters
- `zerolatency` – good for fast encoding and low-latency streaming
- `psnr` – ignore this as it is only used for codec development
- `ssim` – ignore this as it is only used for codec development

For example, if your input is animation then use the `animation` tuning, or if you want to preserve grain in a film then use the `grain` tuning. If you are unsure of what to use or your input does not match any of tunings then omit the `-tune` option. You can see a list of current tunings with `-tune help`.

## Scripts

To automate the process, you can use a script.

### Bash Script

Create `hevc.sh` file

```sh [hevc.sh]
#!/bin/bash

# Get the video file
video="$1"

presetValue="fast"
crfValue="23"
tuneValue=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        -p|--preset)
            flag1="$2"
            shift 2
            ;;
        -c|--crf)
            flag2="$2"
            shift 2
            ;;
        -t|--tune)
            flag3="$2"
            shift 2
            ;;
        *)
            echo "Unknown flag: $1"
            exit 1
            ;;
    esac
done

# Get filename
filename=$(basename -- "$video")
# Get extension
extension="${filename##*.}"
filename="${filename%.*}"
# Output
output="${filename}_output.$extension"

echo "Filename: $filename"
echo "Extension: $extension"
echo "Output: $output"
echo "Preset: $presetValue"
echo "CRF: $crfValue"
echo "Tune: $tuneValue"

baseCommand="ffmpeg -y -i '$video' -c:v libx265"
hideBanner="-hide_banner -loglevel info"
preset="-preset $presetValue"
crf="-crf $crfValue"
audio="-map 0:a -c:a aac -b:a 256k"
subtitle="-map 0:s? -c:s copy"
output="-map 0:v:0 '$output'"

if [ -n "$tuneValue" ]; then
    tune="-tune $tuneValue"
    command="$baseCommand $hideBanner $preset $crf $tune $audio $subtitle $output"
else
    command="$baseCommand $hideBanner $preset $crf $audio $subtitle $output"
fi

start=$(date)
# FFmpeg command
echo "Command: $command"
eval "$command"
end=$(date)
echo "Start: $start"
echo "End: $end"
```

Usage

```sh
./hevc.sh "input.mkv"
```

And with options

```sh
./hevc.sh "input.mkv" -p medium -c 28 -t animation
```

#### Bash script with loop

```sh [hevc-loop.sh]
#!/bin/bash

presetValue="fast"
crfValue="23"
tuneValue=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        -p|--preset)
            flag1="$2"
            shift 2
            ;;
        -c|--crf)
            flag2="$2"
            shift 2
            ;;
        -t|--tune)
            flag3="$2"
            shift 2
            ;;
        *)
            echo "Unknown flag: $1"
            exit 1
            ;;
    esac
done

function hevc {
    # Get filename
    filename=$(basename -- "$video")
    # Get extension
    extension="${filename##*.}"
    filename="${filename%.*}"
    # Output
    output="${filename}_output.$extension"

    echo "Filename: $filename"
    echo "Extension: $extension"
    echo "Output: $output"
    echo "Preset: $presetValue"
    echo "CRF: $crfValue"
    echo "Tune: $tuneValue"

    baseCommand="ffmpeg -y -i '$video' -c:v libx265"
    hideBanner="-hide_banner -loglevel info"
    preset="-preset $presetValue"
    crf="-crf $crfValue"
    audio="-map 0:a -c:a aac -b:a 256k"
    subtitle="-map 0:s? -c:s copy"
    output="-map 0:v:0 '$output'"

    if [ -n "$tuneValue" ]; then
        tune="-tune $tuneValue"
        command="$baseCommand $hideBanner $preset $crf $tune $audio $subtitle $output"
    else
        command="$baseCommand $hideBanner $preset $crf $audio $subtitle $output"
    fi

    start=$(date)
    # FFmpeg command
    echo "Command: $command"
    eval "$command"
    end=$(date)
    echo "Start: $start"
    echo "End: $end"
}

# Loop through all .mkv files in the current directory
for file in *.mkv; do
    [ -f "$file" ] || continue # Skip if not a regular file
    # if filename contains "output" then skip
    [[ $file == *"output"* ]] && continue
    hevc "$file"
done
```

Usage, with all .mkv files in the current directory. You can add options at the end of the command.

```sh
./hevc-loop.sh
```

### PowerShell Script

Create `hevc.ps1` file

```ps1 [hevc.ps1]
# Get the video file
$video = $args[0]

$presetValue = "fast"
$crfValue = "23"
$tuneValue = $null

for ($i = 0; $i -lt $args.Length; $i++) {
    $arg = $args[$i]

    if ($arg -eq "-preset" -and $i + 1 -lt $args.Length) {
        $presetValue = $args[$i + 1]
        $i++
    }
    elseif ($arg -eq "-crf" -and $i + 1 -lt $args.Length) {
        $crfValue = $args[$i + 1]
        $i++
    }
    elseif ($arg -eq "-tune" -and $i + 1 -lt $args.Length) {
        $tuneValue = $args[$i + 1]
        $i++
    }
    else {
        Write-Host "Unknown argument: $arg"
    }
}

# get filename
$filename = [System.IO.Path]::GetFileNameWithoutExtension($video)
# get extension
$extension = [System.IO.Path]::GetExtension($video)
# output
$output = $filename + "_output" + $extension

Write-Host "Filename: $filename"
Write-Host "Extension: $extension"
Write-Host "Output: $output"
Write-Host "Preset: $presetValue"
Write-Host "CRF: $crfValue"
Write-Host "Tune: $tuneValue"

$baseCommand = "ffmpeg -y -i $video -c:v libx265"
$hideBanner = "-hide_banner -loglevel info"
$preset = "-preset $presetValue"
$crf = "-crf $crfValue"
$audio = "-map 0:a -c:a aac -b:a 256k"
$subtitle = "-map 0:s? -c:s copy"
$output = "-map 0:v:0 $output"

if ($tuneValue -ne $null) {
    $tune = "-tune $tuneValue"
    $command = "$baseCommand $hideBanner $preset $crf $tune $audio $subtitle $output"
}
else {
    $command = "$baseCommand $hideBanner $preset $crf $audio $subtitle $output"
}

$start = Get-Date
# ffmpeg command
Write-Host "Command: $command"
Invoke-Expression $command
$end = Get-Date
Write-Host "Start: $start"
Write-Host "End: $end"

```

Usage

```ps1
.\hevc.ps1 "input.mkv"
```

And with options

```ps1
.\hevc.ps1 "input.mkv" -preset medium -crf 28 -tune animation
```

#### PowerShell script with loop

```ps1 [hevc-loop.ps1]
$presetValue = "fast"
$crfValue = "23"
$tuneValue = $null

for ($i = 0; $i -lt $args.Length; $i++) {
    $arg = $args[$i]

    if ($arg -eq "-preset" -and $i + 1 -lt $args.Length) {
        $presetValue = $args[$i + 1]
        $i++
    }
    elseif ($arg -eq "-crf" -and $i + 1 -lt $args.Length) {
        $crfValue = $args[$i + 1]
        $i++
    }
    elseif ($arg -eq "-tune" -and $i + 1 -lt $args.Length) {
        $tuneValue = $args[$i + 1]
        $i++
    }
    else {
        Write-Host "Unknown argument: $arg"
    }
}

function hevc($video) {
    # get filename
    $filename = [System.IO.Path]::GetFileNameWithoutExtension($video)
    # get extension
    $extension = [System.IO.Path]::GetExtension($video)
    # output
    $output = $filename + "_output" + $extension

    Write-Host "Filename: $filename"
    Write-Host "Extension: $extension"
    Write-Host "Output: $output"
    Write-Host "Preset: $presetValue"
    Write-Host "CRF: $crfValue"
    Write-Host "Tune: $tuneValue"

    $baseCommand = "ffmpeg -y -i $video -c:v libx265"
    $hideBanner = "-hide_banner -loglevel info"
    $preset = "-preset $presetValue"
    $crf = "-crf $crfValue"
    $audio = "-map 0:a -c:a aac -b:a 256k"
    $subtitle = "-map 0:s? -c:s copy"
    $output = "-map 0:v:0 $output"

    if ($tuneValue -ne $null) {
        $tune = "-tune $tuneValue"
        $command = "$baseCommand $hideBanner $preset $crf $tune $audio $subtitle $output"
    }
    else {
        $command = "$baseCommand $hideBanner $preset $crf $audio $subtitle $output"
    }

    $start = Get-Date
    # ffmpeg command
    Write-Host "Command: $command"
    Invoke-Expression $command
    $end = Get-Date
    Write-Host "Start: $start"
    Write-Host "End: $end"
}

$mkvFiles = Get-ChildItem -Path . -Filter *.mkv

# Loop through each .mkv file
foreach ($file in $mkvFiles) {
    # if filename contains "output" then skip
    if ($file.Name.Contains("output")) {
        continue
    }
    hevc($file)
}

```

Usage, with all .mkv files in the current directory. You can add options at the end of the command.

```ps1
.\hevc-loop.ps1
```

## Testing

output.1

```sh
ffmpeg -i input.mkv -c:v libx265 -crf 23 -preset medium -c:a aac -strict experimental -b:a 128k -scodec copy -acodec copy output.mkv
```

No full audio tracks

output.2

```sh
ffmpeg -i input.mkv -c:v libx265 -crf 23 -preset medium -c:a aac -strict experimental -b:a 128k -map 0 output.mkv
```

Audio tracks compressed

output.3

```sh
ffmpeg -i input.mkv -c:v libx265 -crf 23 -preset medium -c:a aac -strict experimental -b:a 128k -map 0:v:0 output.mkv
```

No audio tracks

output.4

```sh
ffmpeg -i input.mkv -map 0:v -map 0:a -c:v libx265 -preset medium -crf 23 -c:a copy output.mkv
```

Full audio tracks, double video tracks, no subtitles

output.5

```sh
ffmpeg -i input.mkv -map 0:v -map 0:a -map 0:s? -c:v libx265 -preset medium -crf 23 -c:a copy output.mkv
```

Double video tracks

output.6

```sh
ffmpeg -i input.mkv -map 0:a -map 0:s? -c:v libx265 -preset slow -crf 23 -c:a aac -strict experimental -b:a 128k output.mkv
```

No video track

output.7

```sh
ffmpeg -i input.mkv -map 0:v -map 0:a -map 0:s? -c:v libx265 -preset slow -crf 23 -c:a aac -strict experimental -b:a 128k output.mkv
```

Double video tracks

output.8

```sh
ffmpeg -i input.mkv -c:v libx265 -preset slow -crf 23 -map 0:v:0 -map 0:a -map 0:s? -c:s copy output.mkv
```

Sound bad quality

output.9

```sh
ffmpeg -i input.mkv -c:v libx265 -preset slow -crf 18 -map 0:v:0 -map 0:a -map 0:s? -c:s copy output.mkv
```

output.10

```sh
ffmpeg -i input.mkv -c:v libx265 -preset fast -crf 18 -map 0:v:0 -map 0:a -map 0:s? -c:s copy -c:a aac -strict experimental -b:a 128k output.mkv
```

Excellent but audio track quality

output.11

```sh
ffmpeg -i input.mkv -c:v libx265 -preset fast -crf 18 -map 0:v:0 -c:a aac -b:a 192k -map 0:a -map 0:s? -c:s copy output.mkv
```

Excellent

output.12

```sh
ffmpeg -i input.mkv -c:v libx265 -preset fast -crf 18 -map 0:v:0 -c:a aac -b:a 256k -map 0:a -map 0:s? -c:s copy output.mkv
```

No change

output.13

```sh
ffmpeg -i input.mkv -c:v libx265 -preset fast -crf 23 -map 0:v:0 -c:a aac -b:a 256k -map 0:a -map 0:s? -c:s copy output.mkv
```

Smallest file

output.14

```sh
ffmpeg -i input.mkv -c:v libx265 -preset slow -crf 23 -map 0:v:0 -c:a aac -b:a 256k -map 0:a -map 0:s? -c:s copy output.mkv
```

2 hours, no changes, bitrate=1000kbits/s, speed=0.5x

output.15

```sh
ffmpeg -i input.mkv -c:v libx265 -preset medium -crf 23 -map 0:v:0 -c:a aac -b:a 256k -map 0:a -map 0:s? -c:s copy output.mkv
```

50 min average,bitrate=1000kbits/s, speed=1.7x

output.16

```sh
ffmpeg -i input.mkv -c:v libx265 -preset fast -crf 23 -map 0:v:0 -c:a aac -b:a 256k -map 0:a -map 0:s? -c:s copy output.mkv
```

40 min average,bitrate=1000kbits/s, speed=2.5x

output.17

```sh
ffmpeg -i input.mkv -c:v libx265 -preset fast -crf 18 -map 0:v:0 -c:a aac -b:a 256k -map 0:a -map 0:s? -c:s copy output.mkv
```

45 min average,bitrate=1000kbits/s, speed=2x, big file size

### Files list

```sh
-a----         10/5/2023   4:59 PM     2256732642 input.mkv
-a----         9/30/2023  11:10 AM     1221852163 output.1.mkv
-a----         10/7/2023   2:19 PM     1996117608 output.10.mkv
-a----         10/7/2023   4:01 PM     2119373597 output.11.mkv
-a----         10/7/2023   5:40 PM     2240962297 output.12.mkv
-a----         10/7/2023   7:27 PM     1058118929 output.13.mkv
-a----        10/29/2023   4:12 PM     1137133039 output.14.mkv
-a----        10/30/2023   2:05 PM     1057563589 output.15.mkv
-a----        10/30/2023   3:01 PM     1058118929 output.16.mkv
-a----        10/30/2023   3:55 PM     2240962297 output.17.mkv
-a----         10/5/2023   6:54 PM     1101583708 output.2.mkv
-a----         10/5/2023   7:49 PM      933282959 output.3.mkv
-a----         10/5/2023   8:37 PM     1068343912 output.4.mkv
-a----         10/6/2023   1:32 PM     1068474913 output.5.mkv
-a----         10/6/2023   2:11 PM      168340102 output.6.mkv
-a----         10/6/2023   5:17 PM     1031536640 output.7.mkv
-a----         10/6/2023   7:36 PM     1110082552 output.8.mkv
-a----         10/6/2023  10:00 PM     2104754176 output.9-stopped.mkv
```
