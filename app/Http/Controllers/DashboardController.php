<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\MenuItem;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  public function showDashboard(Request $request)
  {
    $user = auth()->user();

    $categories = Category::all();
    $allMenuItems = MenuItem::with('categories')->get();
    
    $categoriesSummary = array();

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

    return Inertia::render('Dashboard', ['userName' => $user->name, 'categoriesSummary' => $categoriesSummary]);
  }

  public function showMainMenu(Request $request)
  {
    $categories = Category::all()->values();
    $allMenuItems = MenuItem::with('categories')->get()->values();
    
    $menuItemsByCategory = array();

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

    return Inertia::render('MainMenu', ['menuItemsByCategory' => $menuItemsByCategory]);
  }
}
