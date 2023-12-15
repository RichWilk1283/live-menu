<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserDetailsRequest;
use App\Http\Requests\UserLoginRequest;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
  public function register(UserDetailsRequest $request)
  {
    $validatedData = $request->validated();

    $user = User::create([
      'name' => $validatedData['name'],
      'email' => $validatedData['email'],
      'password' => bcrypt($validatedData['password']),
    ]);

    Auth::login($user);

    return redirect('/dashboard');
  }

  public function login(UserLoginRequest $request)
  {
    $validatedData = $request->validated();

    $isExisitingUser = Auth::attempt(['email' => $validatedData['email'], 'password' => $validatedData['password']]);

    if ($isExisitingUser)
    {
      return redirect('/dashboard');
    }

    else
    {
      return redirect()->back();
    }
  }

  public function logout(Request $request)
  {
    Auth::logout();
 
    $request->session()->invalidate();
 
    $request->session()->regenerateToken();
 
    return redirect('/');
  }
  
}
