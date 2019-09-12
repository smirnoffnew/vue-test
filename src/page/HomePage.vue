<template>
    <v-row
            justify="center"
    >
        <v-btn
                v-bind="options"
                class="mt-12"
                @click="$router.push('/courses/create')"
        >
            Create
        </v-btn>
        <v-col cols="2" sm="2">

            <p>Courses Update</p>

            <v-overflow-btn
                    class="my-2"
                    :items="GET_COURSES"
                    label="Overflow Btn"
                    @input="toRout($event)"
                    item-text="title"
                    item-value="id"
            ></v-overflow-btn>

        </v-col>
        <v-btn
                v-bind="options"
                class="mt-12"
                @click="$router.push('/courses')"
        >
            View all courses

        </v-btn>

    </v-row>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "HomePage",
        data(){
            return {
                options: {
                    color: 'primary',
                    elevation: 3
                }
            }
        },
        beforeCreate(){
            this.$store.dispatch('GET_COURSES_WITH_SERVER')
        },
        computed:{
            ...mapGetters({
                 GET_COURSES: 'GET_COURSES'
            })
        },
        methods:{

            toRout(id){
                this.$router.push(`/courses/${id}`)
            }

        }
    }
</script>

<style scoped>

</style>
