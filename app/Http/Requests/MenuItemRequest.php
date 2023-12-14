<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuItemRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      "title" => ['required', 'min:4'],
      "description" => ['required', 'min:10'],
      "price" => ['required'],
      "category" => ['required'],
      "vegetarian" => ['required'],
      "vegan" => ['required'],
      "glutenfree" => ['required'],
      "active" => ['required']
    ];
  }
}
