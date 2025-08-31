<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class EmailTemplateMasterRequest extends FormRequest
{
    public function rules()
    {
        return [
            'template_name' => 'required|string|max:50',
            'subject'       => 'required|string|max:50',
            'body'          => 'required',
            'sender_email'  => 'required|email',
            'cc'            => 'array',
            'cc.*'          => 'email', // each element must be a valid email
        ];
    }

    public function attributes()
    {
        return [
            'template_name' => 'Template Name',
            'subject'       => 'Subject',
            'body'          => 'Body',
            'sender_email'  => 'Sender Email',
            'cc'            => 'Carbon Copy (cc)',
            'cc.*'          => 'Carbon Copy (cc)',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->checkSomeCondition()) {
                $validator->errors()->add('email', 'This email is temporarily restricted.');
            }
        });
    }

    private function checkSomeCondition()
    {
        return false;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new ValidationException($validator);
    }
}

