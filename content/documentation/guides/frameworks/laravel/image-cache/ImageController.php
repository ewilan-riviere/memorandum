<?php

namespace App\Http\Controllers;

use Spatie\Image\Image;
use Spatie\Image\Manipulations;
use Spatie\Image\Exceptions\InvalidManipulation;

class ImageController extends Controller
{
    /**
     * @param $size
     * @param $path
     *
     * @throws InvalidManipulation
     *
     * @return mixed
     */
    public static function thumbnail($size, $path, $crop = true)
    {
        $dimensions = config("image.thumbnails.$size");

        if (! $dimensions) {
            return abort(404);
        }

        $thumbnail = get_thumbnail($path, $size);

        if (! $thumbnail['resolved']) {
            if ($crop) {
                Image::load("storage/$path")
                    ->fit(Manipulations::FIT_MAX, $dimensions['width'], $dimensions['height'])
                    ->save($thumbnail['filepath']);
            } else {
                Image::load("storage/$path")
                    ->save($thumbnail['filepath']);
            }
        }

        return response()->file($thumbnail['filepath']);
    }
}
