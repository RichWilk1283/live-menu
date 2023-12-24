<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use App\Http\Requests\MenuItemRequest;
use App\Models\Category;
use App\Services\HelperServices;
use Inertia\Inertia;

class MenuController extends Controller
{
  public function showCreate(Request $request)
  {
    $categories = Category::all();

    if ($categories === null || empty($categories))
    {
      return to_route('dashboard.show');
    }
    else
    {
      return Inertia::render('Create', ['categories' => $categories]);
    }
  }


  public function createItem(MenuItemRequest $request)
  {
    $validatedData = $request->validated();

    $matchingCategory = Category::where('name', $validatedData['category'])->first();
    $validatedCategoryId = $matchingCategory->id;

    if ($matchingCategory === null || $validatedCategoryId === null)
    {
      return to_route('dashboard.show');
    }    

    $menuItem = MenuItem::create([
      'title' => $validatedData['title'],
      'description' => $validatedData['description'],
      'price' => $validatedData['price'],
      'vegetarian' => $validatedData['vegetarian'],
      'vegan' => $validatedData['vegan'],
      'glutenfree' => $validatedData['glutenfree'],
      'active' => $validatedData['active'],
    ]);

    $menuItem->categories()->attach($validatedCategoryId);
  }


  public function showItemsInCategory(Request $request, string $category)
  {
    $categoryItems = MenuItem::with('categories')->get()->filter(function ($menuItem) use ($category) {
      return $menuItem->categories->contains('name', $category);
    })->values();

    if ($categoryItems === null || $categoryItems->isEmpty())
    {
      return to_route('dashboard.show');
    }
    else
    {
      return Inertia::render('ItemsByCategory', ['categoryItems' => $categoryItems, 'category' => $category]);
    }
  }


  public function showEditItem(Request $request, int $id)
  {
    $menuItem = MenuItem::with('categories')->where('id', $id)->first();
    $categories = Category::all();

    if ($menuItem === null || empty($menuItem) || $categories === null || empty($categories))
    {
      return to_route('dashboard.show');
    }

    return Inertia::render('Edit', ['menuItem' => $menuItem, 'categories' => $categories]);
  }


  public function editItem(MenuItemRequest $request)
  {
    $existingDbId = $request->dbid;
    $validatedData = $request->validated();
    $validatedCategoryId = Category::where('name', $validatedData['category'])->first()->id;

    $menuItem = MenuItem::where('id', $existingDbId)->first();
    $menuItem->title = $validatedData['title'];
    $menuItem->description = $validatedData['description'];
    $menuItem->price = $validatedData['price'];
    $menuItem->vegan = $validatedData['vegan'];
    $menuItem->glutenfree = $validatedData['glutenfree'];
    $menuItem->active = $validatedData['active'];

    $menuItem->save();
    $menuItem->categories()->sync($validatedCategoryId);

    return to_route('dashboard.show');
  }


  public function deleteItem(Request $request, int $id)
  {
    $menuItem = MenuItem::findOrFail($id);
    $menuItem->categories()->detach();
    $menuItem->delete();

    return to_route('dashboard.show');
  }

  public function showMainMenu(Request $request, HelperServices $helperServices)
  {
    $categories = Category::all()->values();
    $allMenuItems = MenuItem::with('categories')->get()->values();

    $menuItemsByCategory = $helperServices->generateMainMenuInfo($categories, $allMenuItems);

    return Inertia::render('MainMenu', ['menuItemsByCategory' => $menuItemsByCategory]);
  }
}
