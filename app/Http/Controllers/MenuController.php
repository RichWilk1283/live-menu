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

    return Inertia::render('Create', ['categories' => $categories]);
  }


  public function createItem(MenuItemRequest $request)
  {
    $validatedData = $request->validated();

    $matchingCategory = Category::where('name', $validatedData['category'])->first();
    $validatedCategoryId = $matchingCategory->id;

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

    return Inertia::render('ItemsByCategory', ['categoryItems' => $categoryItems, 'category' => $category]);
  }


  public function showEditItem(Request $request, int $id)
  {
    $menuItem = MenuItem::with('categories')->where('id', $id)->first();
    $categories = Category::all();

    return Inertia::render('Edit', ['menuItem' => $menuItem, 'categories' => $categories]);
  }


  public function editItem(MenuItemRequest $request)
  {
    $existingDbId = $request->dbid; //id for the db item that needs updating    
    $validatedData = $request->validated(); //new form data to patch into db
    $validatedCategoryId = Category::where('name', $validatedData['category'])->first()->id; //category object from db that matches the new form data category

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

  public function updateMainMenu(Request $request, HelperServices $helperServices)
  {
    $categories = Category::all()->values();
    $allMenuItems = MenuItem::with('categories')->get()->values();

    $menuItemsByCategory = $helperServices->generateMainMenuInfo($categories, $allMenuItems);

    return $menuItemsByCategory;
  }
}
