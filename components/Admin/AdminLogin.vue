<script setup lang="ts">
const client = useSupabaseAuthClient()

const email = ref('')
const password = ref('')
const method = ref('logIn')

const admittedEmails = ['arbust908@gmail.com']

const myData = ref<any>(null)
const myError = ref<any>(null)

const resetInputs = () => {
  email.value = ''
  password.value = ''
}

const logIn = async (e: Event) => {
  e.preventDefault()
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (!error)
    resetInputs()

  myData.value = data
  myError.value = error
}
const magicIn = async (e: Event) => {
  e.preventDefault()
  console.log('magic')
  const { data, error } = await client.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/admin/',
      shouldCreateUser: false,
    },
  })
  console.log(data, error)
  if (!error)
    resetInputs()

  myData.value = data
  myError.value = error
}

const isMagicLink = ref(false)
watch(isMagicLink, (val) => {
  if (val)
    method.value = 'magicIn'
  else
    method.value = 'logIn'
})

const handleSubmit = (e: Event) => {
  console.log('method.value: ', method.value)
  e.preventDefault()
  if (method.value === 'logIn')
    logIn(e)
  else if (method.value === 'magicIn')
    magicIn(e)
}
</script>

<template>
  <section>
    <div class="mt-6 max-w-xs bg-slate-100 rounded p-6 relative pb-12">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-500">Email address</label>
          <div class="mt-1">
            <input id="email" v-model="email" name="email" type="email" autocomplete="email" required class="block w-full appearance-none rounded-md border border-gray-500 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm" placeholder="my@email.com">
          </div>
        </div>

        <template v-if="!isMagicLink">
          <div class="space-y-1">
            <label for="password" class="block text-sm font-medium text-gray-500">Password</label>
            <div class="mt-1">
              <input
                id="password" v-model="password" name="password" type="password" autocomplete="current-password" required
                class="block w-full appearance-none rounded-md border border-gray-500 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm" placeholder="supersecret_1234"
              >
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 uppercase">
              {{ method }}
            </button>
          </div>
        </template>
        <button v-else type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 uppercase">
          <i class="i-ri-star-smile-fill" />
          Do Magic!
        </button>
      </form>
      <div class="text-rose-300">
        {{ myError }}
      </div>
      <button class="p-1 ml-auto absolute bottom-2 right-2" @click="isMagicLink = !isMagicLink">
        <i class="i-ri-star-smile-fill text-rose-300 w-4 h-4" />
      </button>
    </div>
  </section>
</template>
