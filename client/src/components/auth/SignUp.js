import { RouterLink } from "vue-router"
import apiFetch from "../../config/axiosConfig"

export default {
  data() {
    return {
      stylePassword: {
        show: "fa fa-eye",
        hide: "fa fa-eye-slash"
      },
      isPasswordShow: {
        password: false,
        confirmPassword: false
      },
      userInfo: {
        fullname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        picture: "",
      },
      error: {
        fullname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: " ",
      },
      styleError: {
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
    }
  },

  computed: {
    disableButton() {
      if (
        (this.error.fullname === "") &&
        (this.error.username === "") &&
        (this.error.email === "") &&
        (this.error.password === "") &&
        (this.error.confirmPassword === "")
      ) 
        return false
      else
        return true
    },
    textPic() {
      return this.userInfo.picture === "" ? "profile" : this.userInfo.picture.name.slice(0, 16)
    },
  },

  methods: {
    toggleShowPassword() {
      this.isPasswordShow.password = !this.isPasswordShow.password
    },
    onFileChange(e) {
      this.userInfo.picture = e.target.files[0]
      console.log(this.userInfo.picture)
    },
    validation(e) {
      
      switch(e.target.name) {
        case "fullname":
          
          this.error.fullname = (e.target.value.length < 2) ? "minimum 2 Character !" : ""
          this.styleError.fullname = this.error.fullname === "" ? "border-cyan-900" : "border-red-600"
        break
        case "username":
          
          this.error.username = (e.target.value.length < 3) ? "minimum 3 Character !" : ""
          this.styleError.username = this.error.username === "" ? "border-cyan-900" : "border-red-600"
        break
        case "email":
          let regex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}")
          let isOk = regex.test(this.userInfo.email)
          
          this.error.email = isOk ? "" : "Please Enter a valid Email !"
          this.styleError.email = this.error.email === "" ? "border-cyan-900" : "border-red-600"
        break
        case "password":

          this.error.password = (e.target.value.length < 6) ? "minimum password length is 6 !" : ""
          this.styleError.password = this.error.password === "" ? "border-cyan-900" : "border-red-600"
        break
        case "confirm_password": 

          this.error.confirmPassword = (this.userInfo.password === e.target.value) ? "" : "password must be identic"
          this.styleError.confirmPassword = this.error.confirmPassword === "" ? "border-cyan-900" : "border-red-600"
        break
      }
    },

    onSubmitInfo(e) {
      let userInfoFD = new FormData()

      userInfoFD.append("fullname", this.userInfo.fullname)
      userInfoFD.append("username", this.userInfo.username)
      userInfoFD.append("email", this.userInfo.email)
      userInfoFD.append("password", this.userInfo.password)
      userInfoFD.append("picture", this.userInfo.picture)

      apiFetch.post("/api/v1/user/signup", userInfoFD, {
        headers: { "Acces-Control-Allow-Origin": "*" }
      })
        .then((res) => {
          if(res.data.field === "email") {
            this.error.email = res.data.error
          }
          if(res.data.field === "username") {
            this.error.username = res.data.error
          }
          if(res.status === 201) {
            alert("Your Account Has Been Created, Login Now")
            this.$router.push("/auth/signin")
          }
        })
        .catch((err) => {
          console.log(err)
        }
      )

    },
  },

}