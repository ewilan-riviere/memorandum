---
# image: nuxtjs.jpg
title: 'Manage Arrays'
---

```php
<?php

namespace App\Utils;
use stdClass;
use App\Models\Game;

class ManageArray
{
 /**
  * Get selected games into related page
  */
 public static function getSelectedGames($games)
 {
  $new_games = [];
  foreach ($games as $key => $game) {
   $object = new stdClass();
   $object->game_id = $game->game_id;
   $object->game_name = $game->game_name;
   $myArray[] = $object;
   array_push($new_games,$object);
  }
  
  $loveGames = [
   "Botanicula",
   "Dust: An Elysian Tale",
   "Edna & Harvey: Harvey’s New Eyes",
   "Epistory - Typing Chronicles",
   "Evoland",
   "Fran Bow",
   "Melody’s Escape",
   "Memoranda",
   "Papo and Yo",
   "Pyre",
   "Rakuen",
   "Runner2: Future Legend of Rhythm Alien",
   "The Count Lucanor",
   "The Dark Eye: Memoria",
   "The First Tree",
   "The Little Acre",
   "The Whispered World",
   "Transistor",
   "Yono and the Celestial Elephants",
  ];
  
  $likeGames = [
   "AER : Memories of Old",
   "Bastion",
   "Candle",
   "Crypt of the Necrodancer",
   "Enigmatis",
   "Gorogoa",
   "Grim Legends",
   "J.U.L.I.A Among the Stars",
   "Little Inferno",
   "Myst",
   "Never Alone",
   "Nightmare From the Deep",
   "Super Meat Boy",
   "The Book of Unwritten Tales",
   "The Last Tinker",
   "The Night of the Rabbit",
   "Thomas Was Alone",
  ];
  
  $games = [
   "Beatbuddy",
   "Blackwell",
   "Broken Sword",
   "Diablo",
   "HuniePop",
   "Lilly Looking Through",
   "Octodad Dadliest Catch",
   "Owlboy",
   "Pan-pan",
   "The Tiny Bang Story",
   "To the Moon",
   "Torin's Passage",
   "Tri: Of Friendship and Madness",
   "Yooka Laylee",
  ];

  // get game_id
  $current = [];
  foreach ($loveGames as $key => $game) {
   for ($i=0; $i < sizeof($new_games); $i++)
   {
    if ($game === $new_games[$i]->game_name) {
     $obj = new StdClass;
     $obj->game_id = $new_games[$i]->game_id;
     $obj->game_name = $new_games[$i]->game_name;
    }
   }
   array_push($current, $obj);
  }
  // convert objects into array
  $b = [];
  foreach ($current as $key => $value) {
   array_push($b, (array)$value);
  }
  // assign data
  $games = [];
  if ( isset($b) ) {
   foreach ( $b as $game_data ) {
    $game = new Game($game_data, false);
    $filters[] = $first_character = $game->first_character;
    if ( $active_filter === null || $first_character == $active_filter ) {
     $games[] = $game;
    }
   }
  }
  $paginate = false;

  return [
   $paginate,
   $games
  ];
 }

    /**
     * Removing duplicate objects from array
     *
     * @param $array
     */
    public static function my_array_unique($array, $keep_key_assoc = false)
    {
  $duplicate_keys = array();
  $tmp = array();
 
  foreach ($array as $key => $val){
   // convert objects to arrays, in_array() does not support objects
   if (is_object($val))
    $val = (array)$val;
 
   if (!in_array($val, $tmp))
    $tmp[] = $val;
   else
    $duplicate_keys[] = $key;
  }
 
  foreach ($duplicate_keys as $key)
   unset($array[$key]);
 
  return $keep_key_assoc ? $array : array_values($array);
    }

    /**
     * Check differences between two arrays
     *
     * @param $array1
     * @param $array2
     */
    public static function arrayDifference(array $array1, array $array2, array $keysToCompare = null) {
  $serialize = function (&$item, $idx, $keysToCompare) {
   if (is_array($item) && $keysToCompare) {
    $a = array();
    foreach ($keysToCompare as $k) {
     if (array_key_exists($k, $item)) {
      $a[$k] = $item[$k];
     }
    }
    $item = $a;
   }
   $item = serialize($item);
  };
 
  $deserialize = function (&$item) {
   $item = unserialize($item);
  };
 
  array_walk($array1, $serialize, $keysToCompare);
  array_walk($array2, $serialize, $keysToCompare);
 
  // Items that are in the original array but not the new one
  $deletions = array_diff($array1, $array2);
  $insertions = array_diff($array2, $array1);
 
  array_walk($insertions, $deserialize);
  array_walk($deletions, $deserialize);
 
  return array('insertions' => $insertions, 'deletions' => $deletions);
    }
    /**
     * Compare object properties and show diff in PHP
     */
    public static function recursive_array_diff($a1, $a2) {
  $r = array();
  foreach ($a1 as $k => $v) {
   if (array_key_exists($k, $a2)) {
    if (is_array($v)) {
     $rad = self::recursive_array_diff($v, $a2[$k]);
     if (count($rad)) { $r[$k] = $rad; }
    } else {
     if ($v != $a2[$k]) {
      $r[$k] = $v;
     }
    }
   } else {
    $r[$k] = $v;
   }
  }
  return $r;
 }
}
```
