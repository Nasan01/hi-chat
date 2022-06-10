<script src="@/components/auth/SignUp.js"></script>

<template>
  <div class="min-h-screen md:grid md:grid-cols-3 bg-indigo-400">
    <div class="md:col-span-2 md:flex md:flex-col p-5">
      <h1 class="mx-3 text-gray-300 text-3xl"><RouterLink to="/">hi-chaty</RouterLink></h1>
      <img src="@/assets/images/b01.svg" alt="signup" class="text-center" />
    </div>
    <div class="md:col-span-1 md:flex md:flex-col md:items-center md:justify-center bg-gray-200">
      <div class="px-8 py-1">
        <h1 class="text-indigo-400 text-2xl text-center m-3">Create your account</h1>
        <p class="text-center text-indigo-300 m-5">and chat with others!</p>
        <form class="md:flex md:flex-col text-indigo-400 pt-2" enctype="multipart/form-data" @submit.prevent="onSubmitInfo">
          
          <div class="m-2">
            <input 
              class="w-full pl-12 pr-3 py-3 rounded-full outline-none text-gray-600" 
              :class="styleError.fullname"
              type="text"
              name="fullname" 
              id="fullname" 
              placeholder="your fullname !" 
              v-model="userInfo.fullname"
              @keyup="validation"
              required 
            />
            <div class="flex justify-start">
              <p class="relative w-5 bottom-9 left-5 text-indigo-400"><i class="fas fa-user"></i></p>
              <span class="text-red-600 text-xs ml-1">{{ error.fullname }}</span>
            </div>
          </div>
         

          <div class="flex justify-between">
            <div class="m-2 w-2/4">
              <input 
                class="w-full pl-12 pr-3 py-3 rounded-full outline-none text-gray-600" 
                :class="styleError.username"
                type="text"
                name="username" 
                id="username" 
                placeholder="username" 
                v-model="userInfo.username"
                @keyup="validation"
                required 
              />
              <div class="flex justify-start">
                <p class="relative w-5 bottom-9 left-5 text-indigo-400"><i class="fa fa-user"></i></p>
                <span class="text-red-600 text-xs ml-1">{{ error.username }}</span>
              </div>
            </div>
            <div class="m-2 w-2/4 overflow-hidden text-clip">
              <label for="picture" class="block pl-12 pr-2 py-3 max-h-12 text-gray-600 bg-white rounded-full text-clip overflow-hidden">
                <input 
                  class="hidden" 
                  type="file" 
                  name="picture" 
                  id="picture" 
                  accept="image/jpg, image/jpeg, image/png"
                  @change="onFileChange"
                  placeholder="choose a pic"
                  required
                /><span class="text-ellipsis overflow-hidden w-5">{{ textPic }}</span>
              </label>
              <div class="flex justify-start">
                <p class="relative w-5 bottom-9 left-5 text-indigo-400"><i class="fa fa-image"></i></p>
              </div>
            </div>
          </div>
          <div class="m-2">
            <input 
              class="w-full pl-12 pr-3 py-3 rounded-full outline-none text-gray-600" 
              :class="styleError.email"
              type="email" 
              name="email" 
              id="email" 
              placeholder="youremail@domain.com" 
              v-model="userInfo.email"
              @keyup="validation"
              required 
            />
            <div class="flex justify-start">
              <p class="relative w-5 bottom-9 left-5 text-indigo-400"><i class="fa fa-envelope"></i></p>
              <span class="text-red-600 text-xs ml-1">{{ error.email }}</span>
            </div>
          </div>
          <div class="mx-2 mt-2">
            <input 
              class="w-full pl-12 pr-3 py-3 rounded-full outline-none text-gray-600" 
              :class="styleError.password"
              :type="[isPasswordShow.password ? 'text' : 'password' ]"
              name="password" 
              id="password" 
              v-model="userInfo.password"
              @keyup="validation"
              placeholder="password"
              required 
            /> 
            <div class="flex justify-start">
              <p class="relative w-5 bottom-9 left-5 text-indigo-400"><i class="fa fa-lock"></i></p>
              <span class="text-red-600 text-xs ml-1">{{ error.password }}</span>
            </div>
            <div class="flex justify-end">
              <p class="relative w-5 bottom-14 right-2" @click="toggleShowPassword"><i :class="[isPasswordShow.password ? stylePassword.show : stylePassword.hide ]"></i></p>
            </div>
            
          </div>
          <div class="mx-2 -mt-3 mb-2">
            <input 
              class="w-full pl-12 pr-3 py-3 rounded-full outline-none text-gray-600" 
              :class="styleError.confirmPassword"
              :type="[isPasswordShow.confirmPassword ? 'text' : 'password' ]"
              name="confirm_password"
              id="confirm_password" 
              v-model="userInfo.confirmPassword"
              @keyup="validation"
              placeholder="confirm password"
              required 
            />
            <div class="flex justify-start">
              <p class="relative w-5 bottom-9 left-5 text-indigo-400"><i class="fa fa-lock"></i></p>
              <span class="text-red-600 text-xs ml-1">{{ error.confirmPassword }}</span>
            </div>
            <div class="flex justify-end">
              <p class="relative w-5 bottom-16 right-2" @click="isPasswordShow.confirmPassword = !isPasswordShow.confirmPassword"><i :class="[isPasswordShow.confirmPassword ? stylePassword.show : stylePassword.hide ]"></i></p>
            </div>
          </div>
          <div class="m-2 text-right text-ellipsis overflow-hidden">
            <RouterLink to="/auth/signin" class="text-indigo-400 mr-2 text-sm sm:text-md">SignIn</RouterLink>
            <button 
              class="px-3 text-sm py-2 sm:text-md sm:px-4 sm:py-3  text-gray-100 rounded-full  transition duration-200 ease-out" 
              :class="[disableButton ? 'bg-indigo-400 opacity-70 cursor-not-allowed':'bg-indigo-600 hover:bg-indigo-700']"
              :disabled="disableButton" 
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>