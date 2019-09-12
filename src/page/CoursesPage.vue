<template>
    <div style="display: flex; flex-wrap: wrap; width: 100%; justify-content: space-around;">
        <v-card
                style=" margin: 10px; width: 18%"
                v-for="course in courses"
                :color="course.color == 'white' ? 'grey' : course.color"
                :key="course.id"
                dark
        >
            <v-card-text class="white--text">
                <div class="headline mb-2">{{course.title}}</div>
                <div> Country : {{course.country}}</div>
                <div> City : {{course.city}}</div>
                <div> Email : {{course.email}}</div>
            </v-card-text>

            <v-card-actions >
                <v-btn text @click="$router.push(`/courses/${course.id}`)" icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn text @click="toggleModal(course)" icon>
                    <v-icon>mdi-calendar</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog
                v-model="dialog"
                width="300"
                style="position: absolute;"
        >
            <v-date-picker
                    v-model="allowedDatesValue"
                    multiple
                    readonly
                    class="mt-4"
                    ref="picker"
            ></v-date-picker>
        </v-dialog>

    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "CoursesPage",
        data() {
            return {
                date: new Date().toISOString().substr(0, 10),
                modal: false,
                dialog: false,
                openPicker: false,
                allowedDatesValue: ['2019-09-13']
            }
        },
        computed: {

            ...mapGetters({
                courses: 'GET_COURSES'
            })

        },
        /* eslint-disable */
        beforeCreate(){
            console.log(1)
            this.$store.dispatch('GET_COURSES_WITH_SERVER')
        },
        methods: {
            toggleModal(course) {
                this.allowedDatesValue = course.start_dates;
                this.dialog = true
            },
        }
    }
</script>

<style scoped>

</style>
