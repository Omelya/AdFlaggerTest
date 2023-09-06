<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['string', 'max:50', 'min:5', 'required'],
            'description' => ['string', 'max:255', 'min:50', 'required'],
            'url' => ['url', 'required']
        ];
    }
}
