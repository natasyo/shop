<template>
    <footer class="footer">
        <div class="footer__top">
            <div class="container footer__top-container">
                <div class="footer__top-left">
                    <div class="footer__top-icon footer__top-icon_deliver">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="truck" class="svg-inline--fa fa-truck fa-w-20" role="img" viewBox="0 0 640 512"><path fill="currentColor" d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"/></svg>
                    </div>
                    <p class="footer__top-text">Free shipping on orders over $100</p>
                </div>
                <div class="footer__top-right">
                    <div class="footer__top-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone-alt" class="svg-inline--fa fa-phone-alt fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"/></svg>
                    </div>
                    <p class="footer__top-text">Free shipping on orders over $100</p>
                </div>
            </div>
        </div>

        <div class="footer__bottom">
            <div class="container footer__bottom-container">
              <p class="footer__copy">
                  © Copyright 2013 Css Author, All Rights Reserved.
              </p>
              <nav-component class="footer__nav"/>
            </div>
        </div>
    </footer>
</template>
<script>
import NavComponent from './NavComponent.vue'
export default {
  components: { NavComponent }

}
</script>
<style lang="scss">
.footer{
    &__top{
        background: $color-blue;
    }
    &__top-container{
        display: flex;
        height: 106px;
        align-items: center;
    }
    &__top-left,
    &__top-right{
        width: 50%;
        display: flex;
        align-items: center;
    }
    &__top-icon{
        background:#fff;
        border-radius: 50%;
        height: 65px;
        width: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
        svg{
            height: 30px;
            color: $color-blue;

        }
    }
    &__top-icon_deliver{
        svg{
            transform: scale(-1,1);
        }
    }
    &__top-text{
        text-transform: uppercase;
        font-size: 21px;
        color: $footer-color-text;
    }
    &__bottom{
        background: $footer-bottom-color;
    }
    &__bottom-container{
        display: flex;
        justify-content: space-between;
        height: 60px;
        align-items: center;
    }
    &__nav{
        a{
            color: #8adcf0;
        }
    }
    &__copy{
        color: #8adcf0;
    }

}
</style>
