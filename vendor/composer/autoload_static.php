<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitfa77d7a8875023af68fe3c65effaa3f7
{
    public static $prefixLengthsPsr4 = array (
        'L' => 
        array (
            'LLMS\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'LLMS\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitfa77d7a8875023af68fe3c65effaa3f7::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitfa77d7a8875023af68fe3c65effaa3f7::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
