<script setup>
import { ref } from "vue";
import { useCourseDetailStore } from "../stores/courseDetailStore";
import { useHomeStore } from "../stores/homeStore";
import Icons from "@/components/Icons.vue";

const emits = defineEmits(["add_course", "cancel"]);

const courseDetailStore = useCourseDetailStore();
const homeStore = useHomeStore();

const defaultImg = ref(`url(/store/upload.png)`);

const imgInput = ref(null);
const imgElement = ref(null);

const name = ref("");
const description = ref("");
const img = ref("");
const isLoading = ref(false);

function handleUploadImg(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imgElement.value.style.backgroundImage = `url(${e.target.result})`;
            img.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function cancel() {
    emits("cancel");
}

async function save() {
    isLoading.value = true;
    await homeStore.createCourse(name.value, description.value, img.value);
    isLoading.value = false;
    emits("add_course");
    cancel();
}
</script>

<template>
    <div>
        <div class="container">
            <div class="content">
                <div class="course">
                    <div class="course_left">
                        <div class="name">
                            <div class="label" for="name">Tên khoá học</div>
                            <div class="value">
                                <input type="text" id="name" v-model="name" />
                            </div>
                        </div>

                        <div class="description">
                            <div class="label" for="description">Mô tả</div>
                            <div class="value">
                                <textarea
                                    type="text"
                                    id="description"
                                    v-model="description"
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div class="course_right">
                        <div for="img" class="label">Hình ảnh</div>
                        <div
                            ref="imgElement"
                            class="input_file img"
                            :style="{
                                backgroundImage: img
                                    ? `url(${img})`
                                    : defaultImg,
                            }"
                            @click="imgInput.click()"
                        >
                            <input
                                ref="imgInput"
                                id="img"
                                type="file"
                                accept="image/*"
                                @change="handleUploadImg"
                            />
                        </div>
                    </div>
                </div>
                <div class="button_container">
                    <div class="button cancel">
                        <button @click="cancel()">Hủy</button>
                    </div>
                    <div class="button save">
                        <button @click="save()">
                            <span v-if="!isLoading">Lưu</span>
                            <Icons v-if="isLoading" icon="icon_loading" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    place-items: center;
    background-color: #0000006a;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 101;
}

.content {
    width: 800px;
    background-color: #fff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #4b8edb;
    display: flex;
    flex-direction: column;
    gap: 35px;
    padding-bottom: 35px;
}

.button_container {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.button button {
    width: 150px;
    height: 40px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    outline: none;
    border: 1px solid #f0faff;
    background-color: var(--primary-color);
    color: #fff;
}

.cancel button {
    background-color: #929498;
}

.cancel button:hover {
    background-color: #6b6e70;
}

.cancel button:active {
    background-color: #4b4d4e;
}

.save button:hover {
    background-color: #4b8edb;
}

.save button:active {
    background-color: #2e5f8e;
}

.course {
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 100%;
}

.course_left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    width: 50%;
    gap: 20px;
}

.name,
.meaning,
.description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    width: 100%;
}

#description {
    height: 72px;
    padding: 12px;
    resize: none;
}

#description::-webkit-scrollbar {
    display: none;
}

.value {
    width: 100%;
}

.course_right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    width: 40%;
}

.label {
    font-size: 16px;
    font-weight: 700;
    color: #4b8edb;
    margin-bottom: 8px;
}

input,
textarea {
    outline: none;
    border: 1px solid #4b8edb;
    padding: 0 12px;
    height: 36px;
    width: 100%;
    font-size: 16px;
    border-radius: 15px;
    background-color: #f0faff;
    color: var(--primary-color);
}

.img {
    width: 100%;
    height: 156px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 1px 7px 18px -3px rgba(0, 0, 0, 0.75);
}
#img {
    visibility: hidden;
}
</style>
