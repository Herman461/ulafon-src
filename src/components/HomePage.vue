<template>
  <base-header ref="header" :is-shown="wasMainBlockScrolled" />
  <div class="home">
    <template v-if="windowWidth > 767">
      <base-page>
        <template v-slot:first-block>
          <about-block />
        </template>
        <template v-slot:second-block>
          <gallery-block :page="1"/>
        </template>
        <template v-slot:third-block>
          <gallery-block :is-central="true" :page="2"/>
        </template>
      </base-page>
    </template>
    <template v-else>
<!--      <div class="home__intro intro">-->
<!--        <div class="intro__image">-->
<!--          <img src="@/assets/images/intro.jpg" alt="">-->
<!--        </div>-->
<!--        <div class="intro__logo">-->
<!--          <img src="@/assets/images/logo_big.svg" alt="">-->
<!--        </div>-->
<!--        <div class="intro__arrow">-->
<!--          <svg>-->
<!--            <use xlink:href="@/assets/images/icons.svg#arrow-down"></use>-->
<!--          </svg>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="home__title">about</div>-->
<!--      <p class="home__text">Современной визуальной культуре присуще упрощение образов, в том числе и в скульптуре.-->
<!--        Абстрактные формы задают нам вопрос: «Ты чувствуешь?». Работы ULAFONBERBER не стремятся к-->
<!--        упрощению внешнего, но направляют нас к чистоте и гармонии внутреннего. Тихим шепотом они-->
<!--        спрашивают нас: «Ты слышишь?».</p>-->
<!--      <div class="home__image image">-->
<!--        <router-link to="/" class="image__item">-->
<!--          <img src="@/assets/images/portrait/Ula_52965_DONE-min.jpg" alt="">-->
<!--        </router-link>-->
<!--      </div>-->
<!--      <p>ULAFONBERBER</p>-->
<!--      <p>-->
<!--        Имя ULA воплощает все светское, социальное, то есть осознаваемое. FON означает-->
<!--        принадлежность к месту, к роду... к своим корням, которые прочно удерживают нас в-->
<!--        равновесии. BERBER олицетворяет глубинную свободу и силу духа, подобную той, что позволила-->
<!--        древним племенам Северной Африки – берберам – сохранить свои традиции и язык, свою истинную-->
<!--        природу даже под натиском мусульманских завоеваний.-->
<!--      </p>-->
<!--      <div class="home__works">-->
<!--        <gallery-block :page="1"/>-->
<!--      </div>-->
<!--      <p>-->
<!--        Греческие корни и академическое образование сформировали у скульптора приверженность к-->
<!--        реалистическому классическому искусству. В то же время ей особенно близка философия-->
<!--        тибетской духовной традиции Юндрунг Бон, направленной на достижение счастья и благополучия-->
<!--        через обретение абсолютной свободы. Она наполняет работы ULA гармонией, рождающей истинную-->
<!--        красоту. Согласно этому древнему учению, причина человеческих страданий не находится вовне,-->
<!--        а есть следствие наших собственных заблуждений. Как и все духовные учения, Юндрунг Бон-->
<!--        стремится помогать всем живым существам и делать их жизнь лучше. Поэтому оно не противоречит-->
<!--        ни одной религии. А скорее наоборот, призывает к осознанной опоре на традиции в поисках-->
<!--        баланса.-->
<!--      </p>-->
<!--      <p>-->
<!--        Свое воплощение эта идея нашла в одноименной скульптуре. На первый взгляд, тибетский-->
<!--        мальчик-монах забавляется, пытаясь удержаться на толстой верёвке. Однако, по замыслу автора,-->
<!--        он олицетворяет постоянную работу над собой в стремлении сохранить свое внутреннее-->
<!--        равновесие.-->
<!--      </p>-->
<!--      <router-link to="/gallery" class="home__link link link_big">смотреть галерею</router-link>-->
      <div class="home__main main-home" ref="mainScreen">
        <div class="main-home__logo">
          <img :style="{transform: 'scale(' + scaleLogo + ')', top: topLogo + '%'}" src="@/assets/images/logo.svg" alt="">
        </div>
      </div>
      <div class="line"></div>
      <div class="gallery">
        <div class="gallery__column">
          <gallery-block :page="1" />
        </div>
        <div class="gallery__column">
          <gallery-block :page="2" />
        </div>
      </div>
      <about-block ref="about" />
    </template>
  </div>
</template>

<script>
import GalleryBlock from "@/components/blocks/GalleryBlock";
import AboutBlock from "@/components/blocks/AboutBlock";
import BasePage from "@/components/BasePage";
import pageInstanceState from "@/pageInstance/page-instance.state";
import {pageStateInit} from "@/pageInstance/page-instance.state";
import BaseHeader from "@/components/common/BaseHeader";

export default {
  name: 'HomePage',
  data() {
    return {
      wasMainBlockScrolled: false,
      mainScreenHeight: 0,
      scaleLogo: 4,
      topLogo: 50,
      logoWidth: 90
    }
  },
  created() {
    pageStateInit()
    window.addEventListener('scroll', () => {
      this.mainScreenHeight  = this.$refs.mainScreen.offsetHeight
      const scrollTop = document.documentElement.scrollTop

      if (scrollTop > this.mainScreenHeight && !this.wasMainBlockScrolled) {
        this.wasMainBlockScrolled = true
        this.scaleLogo = 1
        this.topLogo = 5
        return
      } else if (scrollTop < this.mainScreenHeight && this.wasMainBlockScrolled) {
        this.wasMainBlockScrolled = false
      }

      const offset = (scrollTop / this.mainScreenHeight)
      const scale = ((1 - offset) * 4).toFixed(2)

      this.logoWidth = scale * 90
      if (scale >= 1) {
        this.scaleLogo = scale
      }

      const top = ((1 - offset) * 50).toFixed(2)
      if (top >= 5) {
        this.topLogo = top;
      }


    })

  },
  computed: {
    windowWidth() {
      return pageInstanceState.windowWidth
    }
  },
  components: {BaseHeader, BasePage, AboutBlock, GalleryBlock},
}
</script>
