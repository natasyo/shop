<template lang="">
    <div class="nav">
                <router-link to="/account">Account</router-link>
                <router-link to="/wishlist">Wishlist</router-link>
                <router-link to="/checkout">Checkout</router-link>
                <router-link to="/login">Log In</router-link>
                <router-link to="/signup">Sign Up</router-link>
              </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.nav{
font-family: $font-family;
        font-size: 13px;
        a{
            color:#fff;
            text-decoration: none;
            display: block;
            padding: 0 19px 0 5px;
            &:first-child{
                border-right: 1px solid #fff;
            }
        }
        display: flex;
}
</style>
