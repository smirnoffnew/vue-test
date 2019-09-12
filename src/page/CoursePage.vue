<template>
    <div style="width: 100%">
        <v-btn text @click="$router.push('/courses')"  color="primary">
            Back
        </v-btn>
        <v-card
                style=" margin:auto; width: 40%"
                :color="course.color == 'white' || !course.color  ? 'grey' : course.color"
                :key="course.id"
                dark
        >
            <v-card-text class="white--text">
                <div class="headline mb-2" v-if="!isEdit">{{course.title}}</div>
                <v-text-field
                        v-if="isEdit"
                        :value="course.title"
                        @input="save($event, 'title')"
                        :counter="50"
                        label="title"
                        required
                ></v-text-field>
                <div class="headline mb-2" v-if="!isEdit">{{course.email}}</div>
                <v-text-field
                        v-if="isEdit"
                        :value="course.email"
                        @input="save($event, 'email')"
                        :counter="50"
                        label="email"
                        required
                ></v-text-field>
                <div v-if="!isEdit"> Country : {{course.country}}</div>
                <v-overflow-btn
                        class="my-2"
                        :value="course.country"
                        v-if="isEdit"
                        :items="countries"
                        label="Select Country"
                        @input="getDataCountryAndSave($event, 'country')"
                        item-text="name"
                        item-value="name"
                ></v-overflow-btn>
                <div v-if="!isEdit"> City : {{course.city}}</div>
                <v-overflow-btn
                        class="my-2"
                        v-if="isEdit"
                        :value="course.city"
                        :items="cities"
                        label="Select City"
                        @input="save($event, 'city')"
                        item-text="name"
                        item-value="name"
                ></v-overflow-btn>
                <v-color-picker
                        v-model="color"
                        :hide-canvas="hideCanvas"
                        :hide-inputs="hideInputs"
                        :hide-mode-switch="hideModeSwitch"
                        :mode.sync="mode"
                        :show-swatches="showSwatches"
                        class="mx-auto"
                ></v-color-picker>
                <div v-if="!isEdit"> Email : {{course.email}}</div>
            </v-card-text>

            <v-card-actions>
                <v-btn text v-if="!isCreate" @click="isEdit = !isEdit" icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn text @click="toggleModal(course)" icon>
                    <v-icon>mdi-calendar</v-icon>
                </v-btn>
                <v-btn text @click="isCreate ? create() :saveData()" icon>
                    <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog
                v-model="dialog"
                width="300"
        >
            <v-date-picker
                    v-model="allowedDatesValue"
                    multiple
                    @input="save($event, 'start_dates')"
                    class="mt-4"
                    ref="picker"
            ></v-date-picker>
        </v-dialog>

    </div>
</template>

<script>
    /* eslint-disable */
    import {mapGetters} from "vuex";
    import {StepData} from "../store/localStorage/saveStepData";

    export default {

        name: "CoursePage",

        beforeCreate(){
            this.$store.commit('UPDATE_SPINNER', true);
        },

        async created(){
            this.id = this.$route.params.id;
            if(this.id == 'create') {
                this.isCreate = true;
                this.isEdit = true;
                const data = StepData.getStepData();
                this.$store.commit('UPDATE_SPINNER', false);
                this.$store.commit('UPDATE_DATA_FOR_LOCAL', !data ? {} : data );
                return this.$store.dispatch('GET_COUNTRIES_WITH_SERVER', data.country ? data.country : null);
            } else {
                const data = await this.$store.dispatch('GET_COURSE_WITH_SERVER', this.id);
                return this.$store.dispatch('GET_COUNTRIES_WITH_SERVER', data.country);
            }

        },
        data(){
            return {
                dialog: false,
                allowedDatesValue: [],
                isEdit: false,
                isCreate: false,
                id: null,
                hideCanvas: false,
                hideInputs: false,
                hideModeSwitch: false,
                mode: 'rgba',
                modes: ['rgba', 'hsla', 'hexa'],
                showSwatches: false,
            }
        },
        computed:{
            ...mapGetters({
                course: 'GET_COURSE',
                countries: 'GET_COUNTRIES',
                cities: 'GET_CITIES',
            }),
            color:{
                get(){
                    return this.course.color
                },
                set(val) {
                    this.save(typeof val == 'string' ? val : val.hex, 'color')
                }
            }

        },
        methods: {
            toggleModal(course) {
                this.allowedDatesValue = !course.start_dates ? [] : course.start_dates;
                this.dialog = true
            },
            save(event, title){
                if(!event) return;
                let data = {...this.course};
                data[title] = event;
                this.$store.commit('UPDATE_DATA_FOR_LOCAL', data );
                this.isCreate && StepData.setStepData(data);
            },
            async create(){
                const id = await this.$store.dispatch('CREATE_DATA_FOR_SERVER',this.course);
                this.isCreate && StepData.clearStepData();
                this.$router.push(`/courses`);
            },
            async saveData(){
                this.$store.commit('UPDATE_SPINNER', true);
                await this.$store.dispatch('UPDATE_DATA_FOR_SERVER', {id:this.id, value:this.course });
            },
            async getDataCountryAndSave(name){
                this.$store.commit('UPDATE_SPINNER', true);
                const save = this.countries.find(item => item.name == name);
                await this.$store.dispatch('GET_CITIES_WITH_SERVER', save.id);
                this.save(save.name, 'country');
            },
        },
        watch:{
            '$route'(){
                this.isCreate = false;
                this.isEdit = false;
                if(this.$route.params.id == 'create') {
                    this.isCreate = true;
                    this.isEdit = true;
                    return;
                }
                this.$store.dispatch('GET_COURSE_WITH_SERVER', this.$route.params.id);
            }
        }
    }
</script>

<style scoped>

</style>
