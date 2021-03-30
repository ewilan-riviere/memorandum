---
title: Email with Vue.js
description: 'With embedded Vue, how to send mail with Vue.js form.'
position: 4
category: 'Laravel'
---

```bash
composer require google/recaptcha
yarn add sweetalert2 vue-recaptcha
```

<collapsable></collapsable>

<vue-code-info ext="php" path="resources/views/vendor/notifications/email.blade.php"></vue-code-info>

```php
@component('mail::message')
{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
# @lang('Hello!')
@endif

<div>
    <div style="margin-bottom: 1rem;">
        {{$explain}}
    </div>
    <hr>
    <h2>Demande de contact</h2>
    <div>
        <div>
            <b>Nom</b> : {{$mail_form['lastname']}}
        </div>
        <div>
            <b>Prénom</b> : {{$mail_form['firstname']}}
        </div>
        <div>
            <b>E-mail</b> : <a href="mailto:{{$mail_form['email']}}">{{$mail_form['email']}}</a>
        </div>
    </div>
    <div style="margin-top: 1rem;">
        <b>Message :</b>
        <p>
            {{$mail_form['message']}}
        </p>
    </div>
    <hr>
</div>

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
@lang('Regards'),<br>
{{ config('app.name') }}
@endif

@endcomponent
```

<vue-code-info ext="php" path="resources/views/vendor/notifications/email.blade.php"></vue-code-info>
config/recaptcha.php

```php
<?php

return [
    'recaptcha_site' => env('RECAPTCHA_SITE_KEY'),
    'recaptcha_secret' => env('RECAPTCHA_SECRET_KEY'),
];
```

<vue-code-info ext="php" path="resources/views/vendor/notifications/email.blade.php"></vue-code-info>
contact.blade.php

```php
@extends('layouts.website')

@section('content')
    <div>
        <div>
            Contact
        </div>
        <div>
            <contact-form
                url="{{ route('contact.send') }}"
                site-key="{{ config('google.recaptcha_site') }}"
                env="{{ config('app.env') }}">
            </contact-form>
        </div>
    </div>
@endsection
```

<vue-code-info ext="php" path="resources/views/vendor/notifications/email.blade.php"></vue-code-info>

```php
<?php

// app/Mail/NewContact.php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewContact extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($request)
    {
        $this->request = $request;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $greeting = "Bonjour,";
        $explain =
            "Vous avez reçu une demande de contact depuis votre site web.
            Vous trouverez ci-dessous le contenu de ce message.";
        $subject = "[Domain] Demande de contact";
        $salutation =
            "Ceci est un e-mail automatique de votre site web,
            si vous souhaitez répondre à cette personne,
            veuillez utiliser son e-mail (" . $this->request['email'] . ").";
        return $this->subject($subject)->markdown('vendor.notifications.email')
            ->with([
                'greeting' => $greeting,
                'explain' => $explain,
                'mail_form' => $this->request,
                'salutation' => $salutation,
            ]);
    }
}
```

<vue-code-info ext="php" path="resources/views/vendor/notifications/email.blade.php"></vue-code-info>

```vue
<template>
  <form @submit.prevent="onSubmit">
    <div class="px-3">
      <input
        v-model="form.lastname"
        name="lastname"
        placeholder="Nom"
        maxlength="30"
        required
      />
      <input
        v-model="form.firstname"
        name="firstname"
        placeholder="Prénom"
        maxlength="30"
        required
      />
      <input
        v-model="form.email"
        name="email"
        placeholder="E-mail"
        maxlength="50"
        type="email"
        required
      />
      <textarea
        v-model="form.message"
        name="message"
        placeholder="Votre message"
        maxlength="50"
        require
      ></textarea>

      <label for="accept">
        <checkbox type="checkbox" id="accept" required></checkbox>
        <span class="ml-3">
          J'accepte que mes données à caractère personnel soit recueillies sur
          ce formulaire afin d'accéder au traitement de ma demande.
          <div>
            <small class="google-message">
              Ce site est protégé par reCAPTCHA, la
              <a href="https://policies.google.com/privacy" target="_blank">
                politique de confidentialité
              </a>
              et les
              <a href="https://policies.google.com/terms" target="_blank">
                conditions d'utilisation
              </a>
              de Google s'appliquent.
            </small>
          </div>
        </span>
      </label>

      <div>
        <div v-if="pending">
          Envoi en cours...
        </div>
        <div v-else>
          <br />
        </div>
      </div>
      <div>
        <vue-recaptcha
          ref="recaptcha"
          :sitekey="siteKey"
          size="invisible"
          @verify="send"
        ></vue-recaptcha>
        <button type="submit" variant="primary" :disabled="pending">
          Envoyer
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'

export default {
  components: {
    VueRecaptcha
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    siteKey: {
      type: String,
      default: ''
    },
    env: {
      type: String,
      default: 'local'
    }
  },
  data() {
    return {
      form: {
        lastname: '',
        firstname: '',
        email: '',
        message: ''
      },
      pending: false
    }
  },
  created() {
    this.seedingForm()
  },
  methods: {
    seedingForm() {
      if (this.env === 'local') {
        this.form = {
          lastname: 'Lastname',
          firstname: 'Firstname',
          email: 'fake@mail.com',
          message: 'This is my amazing message !'
        }
      }
    },
    onSubmit() {
      this.pending = true
      this.$refs.recaptcha.execute()
    },
    async send() {
      try {
        await window.axios.post(
          this.url,
          Object.assign(this.form, {
            'g-recaptcha-response': window.grecaptcha.getResponse()
          })
        )
        this.form.lastname = ''
        this.form.firstname = ''
        this.form.email = ''
        this.form.message = ''
        this.$refs.recaptcha.reset()

        window.Swal.fire(
          'Demande de contact envoyée',
          'Nous traiterons votre demande dès que possible !',
          'success'
        )
      } catch (e) {
        window.Swal.fire(
          'Erreur inattendue',
          'Veuillez réessayer plus tard.',
          'error'
        )
      }

      this.pending = false
    }
  }
}
</script>
```

<vue-code-info ext="php" path="resources/views/vendor/notifications/email.blade.php"></vue-code-info>

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\NewContact;
use Illuminate\Support\Facades\Mail;
use App\Models\Page;

class MailController extends Controller
{
    /**
     * Display contact page.
     *
     * @return View
     */
    public function index()
    {

        return view('contact');
    }

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function send(Request $request)
    {
        $this->validate($request, [
            'lastname' => 'required',
            'firstname' => 'required',
            'email' => 'required|email',
            'message' => 'required',
            'g-recaptcha-response' => 'required|recaptcha'
        ]);

        $contact = config('mail.from.address');
        Mail::to($contact)->send(new NewContact($request->input()));

        return [
            'data' => 'E-mail envoyé'
        ];
    }
}
```

<vue-code-info ext="php" path="resources/views/vendor/notifications/email.blade.php"></vue-code-info>

```js
import Vue from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import VueRecaptcha from 'vue-recaptcha'

window.Swal = Swal
window.axios = axios
window.Vue = require('vue')
require('./bootstrap')

const files = require.context('./', true, /\.vue$/i)
files.keys().map((key) =>
  Vue.component(
    key
      .split('/')
      .pop()
      .split('.')[0],
    files(key).default
  )
)

Vue.component('vue-recaptcha', VueRecaptcha)

const app = new Vue({
  el: '#app',
  data: {}
})
```

<vue-code-info ext="php" path="resources/views/vendor/notifications/email.blade.php"></vue-code-info>

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('recaptcha', function ($attribute, $value, $parameters, $validator) {
            $recaptcha = new \ReCaptcha\ReCaptcha(config('google.recaptcha_secret'));
            $resp = $recaptcha->verify($value);
            return $resp->isSuccess();
        });
    }
}
```

```js
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=25
MAIL_USERNAME=16a36c1ca81e03
MAIL_PASSWORD=d49144dd24808d
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="noreply@domain.com"
MAIL_FROM_NAME="${APP_NAME}"
MAIL_TO_ADDRESS="contact@domain.com"
MAIL_TO_NAME="Domain"

RECAPTCHA_SITE_KEY="site-key"
RECAPTCHA_SECRET_KEY="secret-key"
```
