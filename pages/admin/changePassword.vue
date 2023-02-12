<script setup lang="ts">

</script>

<template>
  <div class="lg:grid lg:grid-cols-12 lg:gap-x-5 mx-auto h-auto">
    <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
      <form action="#" method="POST">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Password Recovery
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Use a permanent address where you can recieve mail.
              </p>
            </div>

            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="first-name" class="block text-sm font-medium text-gray-700">Name</label>
                <input id="first-name" type="text" name="first-name" autocomplete="given-name" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="last-name" class="block text-sm font-medium text-gray-700">Pass</label>
                <input id="last-name" type="text" name="last-name" autocomplete="family-name" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Recover
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
