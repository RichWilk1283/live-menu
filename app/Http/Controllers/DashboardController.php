<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\MenuItem;
use App\Services\HelperServices;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  public function showDashboard(Request $request, HelperServices $helperService)
  {
    $user = auth()->user();

    $categories = Category::all();
    $allMenuItems = MenuItem::with('categories')->get();

    $categoriesSummary = $helperService->generateDashboardSummary($categories, $allMenuItems);

    return Inertia::render('Dashboard', ['userName' => $user->name, 'categoriesSummary' => $categoriesSummary]);
  }
}
