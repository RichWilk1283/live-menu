<?php

namespace App\Services;

use Illuminate\Support\Collection;
use App\Models\MenuItem;
use App\Models\Category;

class HelperServices
{

  public function generateDashboardSummary(Collection $categories, Collection $allMenuItems) : array
  {
    $categoriesSummary = [];

    foreach ($categories as $category) {
      $items = $allMenuItems->filter(function ($menuItem) use ($category) {
        return $menuItem->categories->contains('name', $category->name);
      });

      $activeItems =  $items->filter(function ($item) {
        return $item->active == true;
      });

      $inActiveItems = $items->filter(function ($item) {
        return $item->active == false;
      });

      $averagePrice = number_format($items->avg('price'), 2);

      $groupedItems = [
        'category' => $category->name,
        'info' =>
        [
          'totalItems' => $items->count(),
          'totalActive' => $activeItems->count(),
          'totalInactive' => $inActiveItems->count(),
          'averagePrice' => $averagePrice
        ]
      ];
      array_push($categoriesSummary, $groupedItems);
    }
    return $categoriesSummary;
  }

  public function generateMainMenuInfo(Collection $categories, Collection $allMenuItems) : array
  {
    $menuItemsByCategory = [];

    foreach ($categories as $category) {
      $items = $allMenuItems->filter(function ($menuItem) use ($category) {
        return $menuItem->categories->contains('name', $category->name);
      });

      $activeItems =  $items->filter(function ($item) {
        return $item->active == true;
      })->values();

      $groupedItems = [
        'category' => $category->name,
        'items' => $activeItems
      ];
      array_push($menuItemsByCategory, $groupedItems);
    }
    
    return $menuItemsByCategory;
  }

}