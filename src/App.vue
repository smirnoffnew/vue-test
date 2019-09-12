<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-list dense>
                <v-list-item @click="$router.push('/home')" :style="{background: activeLink('home') ? 'blue' : 'white'}">
                    <v-list-item-action>
                        <v-icon :style="{color: activeLink('home') ? 'white' : ''}">mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title :style="{color: activeLink('home') ? 'white' : ''}">Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="$router.push('/courses')" :style="{background: activeLink('courses') ? 'blue' : 'white'}">
                    <v-list-item-action>
                        <v-icon :style="{color: activeLink('courses') ? 'white' : ''}">mdi-contact-mail</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title :style="{color: activeLink('courses') ? 'white' : ''}">Courses</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="indigo"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer
                color="indigo"
                app
        >
            <span class="white--text">&copy; 2019</span>
        </v-footer>
        <div class="spinner" v-if="active">
            <v-progress-circular
                    :width="3"
                    color="primary"
                    indeterminate
            ></v-progress-circular>
        </div>
    </v-app>
</template>

<script>

    /* eslint-disable */
    import {mapGetters} from "vuex";

    export default {
        name: 'App',
        components: {},
        data: () => ({
            drawer: null,
            name: ''
        }),
        created(){
            this.name = this.$route.path;
        },
        methods:{
            activeLink(name){
                return this.name.indexOf(name) > -1
            }
        },
        computed:{

            ...mapGetters({
                active: 'IS_ACTIVE'
            })

        },
        watch:{
            '$route'(to){
                this.name = to.path;
            }
        }
    };
</script>

<style>
    .spinner{
        width: 100%;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff
    }
</style>
