<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Image Driver
    |--------------------------------------------------------------------------
    |
    | Intervention Image supports "GD Library" and "Imagick" to process images
    | internally. You may choose one of them according to your PHP
    | configuration. By default PHP's "GD Library" implementation is used.
    |
    | Supported: "gd", "imagick"
    |
    */

    'driver' => 'gd',

    'thumbnails' => [
        // Classic
        'admin_preview' => [
            'width'  => 200,
            'height' => 200,
        ],
        'small' => [
            'width'  => 400,
            'height' => 400,
        ],
        'medium' => [
            'width'  => 900,
            'height' => 900,
        ],
        'large' => [
            'width'  => 1800,
            'height' => 1800,
        ],

        // Custom sizes
        'post' => [
            'width'  => 600,
            'height' => 500,
        ],
        'newsletter_feature' => [
            'width'  => 500,
            'height' => 250,
        ],
        'newsletter_offer' => [
            'width'  => 250,
            'height' => 250,
        ],
        'entity_banner' => [
            'width'  => 2000,
            'height' => 600,
        ],
        'entity_thumbnail' => [
            'width'  => 550,
            'height' => 600,
        ],
        'agency_banner' => [
            'width'  => 2000,
            'height' => 1000,
        ],
        'agency_img1' => [
            'width'  => 500,
            'height' => 300,
        ],
        'agency_img2' => [
            'width'  => 600,
            'height' => 400,
        ],
        'agency_img3' => [
            'width'  => 400,
            'height' => 300,
        ],
        'team_member' => [
            'width'  => 300,
            'height' => 400,
        ],
        'avatar' => [
            'width'  => 100,
            'height' => 100,
        ],
    ],
];
