/// <reference types="@sveltejs/kit" />

import type Toucan from 'toucan-js';

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare global {
  declare namespace App {
    interface Locals {
      sentry?: Toucan;
    }

    interface Platform {
      context: Context;
    }

    // interface Session {}
    // interface Stuff {}
  }
}
