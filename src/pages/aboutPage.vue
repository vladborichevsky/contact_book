<template>
  <div class="about_page" :class="{ night_mode_class: nightMode }">
    <div class="container">

      <h1 
        :class="{ text_color_white: nightMode, text_color_black: nightMode }">
          About the application
      </h1>

      <div 
        class="text" 
        :class="{ text_color_white: nightMode, text_color_black: nightMode }">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde nobis tenetur eius magni, voluptatum culpa cum, distinctio id accusamus repudiandae laudantium libero a molestiae eos inventore nemo autem porro animi?
          </p>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, assumenda iste facilis necessitatibus est id sapiente voluptate saepe dicta vero amet possimus laboriosam accusantium at pariatur inventore temporibus iure rem!
          </p>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore saepe veritatis iure itaque eligendi culpa officia facere veniam nobis! Neque quisquam in iusto enim sint temporibus inventore numquam deserunt alias!
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas placeat, modi voluptatum tempora unde quod. Aliquam sint fuga aspernatur placeat dolores, iure libero quos quia, corporis est tempore, impedit ratione.
          </p>
      </div>

      <div 
        @click="$router.push('/')" 
        class="back_btn"
        :class="{ text_color_white: nightMode, text_color_black: nightMode }">
          Back to contacts
      </div>

    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex' 

  export default {

    computed: {
      ...mapState({
        nightMode: state => state.nightMode
      })
    }

  }
</script>

<style scoped>
  .about_page {
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 50px 0 0 0;
  }

  .night_mode_class {
    background-color: var(--night-mode-color);
    color: var(--white-color);
  }

  .container {
    margin: 0 auto;
    width: 600px;
  }

  .text {
    margin-top: 50px;
  }

  .text p {
    margin-top: 10px;
    text-align: justify;
    text-indent: 30px;
  }

  .back_btn {
    width: 180px;
    background-color: transparent;
    border-color: transparent;
    text-transform: uppercase;
    margin: 0 auto;
    margin-top: 100px;
		cursor: pointer;
		padding: 8px 16px;
		font-size: 16px;
    font-weight: 600;
		transition: all 0.3s;
  }

  .back_btn:hover {
    color: var(--blue-color);
  }

  .text_color_black {
    color: var(--black-color);
  }

	.text_color_white {
    color: var(--white-color);
  }
</style>