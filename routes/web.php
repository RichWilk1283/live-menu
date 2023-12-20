<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//PAGES

Route::get('/', [HomeController::class, 'show'])->name('home');
Route::get('/dashboard', [DashboardController::class, 'showDashboard'])->middleware('auth')->name('dashboard.show');
Route::get('/mainmenu', [MenuController::class, 'showMainMenu'])->name('mainmenu.show');
Route::get('/createmenuitem', [MenuController::class, 'showCreate'])->middleware('auth');
Route::get('/categoryitems/{category}', [MenuController::class, 'showItemsInCategory'])->middleware('auth')->name('categoryitems.show');
Route::get('/menuitem/{id}', [MenuController::class, 'showEditItem'])->middleware('auth');

//USER ACTIONS

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);

//MENU ACTIONS

Route::post('/createitem', [MenuController::class, 'createItem'])->middleware('auth');
Route::patch('/editmenuitem', [MenuController::class, 'editItem'])->middleware('auth');
Route::delete('/deletemenuitem/{id}', [MenuController::class, 'deleteItem'])->middleware('auth');
Route::get('/updateMainMenu', [MenuController::class, 'updateMainMenu']);