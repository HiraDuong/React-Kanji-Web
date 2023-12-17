<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useHomeStore } from "../stores/homeStore";
import CardDetail from "@/components/CardDetail.vue";
import Icons from "@/components/Icons.vue";
import { useCourseDetailStore } from "../stores/courseDetailStore";
import AddCard from "@/components/AddCard.vue";
import Popup from "@/components/Popup.vue";

const route = useRoute();
const router = useRouter();
const homeStore = useHomeStore();
const courseDetailStore = useCourseDetailStore();
const imgInput = ref(null);
const img = ref(null);
const defaultImg = ref(`url(/store/upload.png)`);
const warningText = ref("");
const showWarning = ref(false);
const action = ref({
    delete: "course",
    id: null,
});
const isLoading = ref(false);

onMounted(async () => {
    courseDetailStore.isOwner = false;
    await getCourse();
    await homeStore.getUserAddress();
    if (courseDetailStore.course.course.author == homeStore.userAddress) {
        courseDetailStore.isOwner = true;
    }
});

function handleUploadImg(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            img.value.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
}

async function getCourse() {
    await courseDetailStore.getCourse(BigInt(route.params.id));
}

async function accept() {
    isLoading.value = true;
    if (action.value.delete == "course") {
        await homeStore.deleteCourse(action.value.id);
        await homeStore.getAllCourses();
        await router.push({ name: "courses" });
    } else {
        await homeStore.deleteCard(action.value.id);
        await getCourse();
    }
    showWarning.value = false;
    isLoading.value = false;
}
</script>

<template>
    <div>
        <Teleport to="body">
            <AddCard
                v-if="courseDetailStore.isOpenAddCard"
                @add_card="getCourse()"
            />
        </Teleport>
        <Teleport to="body">
            <Popup
                v-if="showWarning"
                :text="warningText"
                @cancel="showWarning = false"
                @accept="accept()"
                :isLoading="isLoading"
            />
        </Teleport>
        <div class="container">
            <div class="top">
                <div class="title">
                    <span>
                        {{
                            courseDetailStore.isOwner
                                ? "Khoá học của tôi"
                                : "Khoá học"
                        }}
                    </span>
                    <div
                        class="delete_button"
                        v-if="courseDetailStore.isOwner"
                        @click="
                            () => {
                                action.delete = 'course';
                                action.id = courseDetailStore.course.course.id;
                                warningText =
                                    'Bạn có chắc chắn muốn xóa khoá học này?';
                                showWarning = true;
                            }
                        "
                    >
                        <Icons icon="icon_delete" :size="36" />
                    </div>
                </div>
                <div class="top_button">
                    <div class="join">
                        <button
                            class="join_button add_button"
                            @click="
                                () => {
                                    router.push(
                                        `/practice/${courseDetailStore.course.course.id}`
                                    );
                                }
                            "
                        >
                            Luyện tập khoá học
                        </button>
                    </div>
                    <div class="join">
                        <button
                            class="join_button add_button"
                            @click="
                                () => {
                                    router.push(
                                        `/study/${courseDetailStore.course.course.id}`
                                    );
                                }
                            "
                        >
                            Học khoá học
                        </button>
                    </div>
                    <div class="add_card" v-if="courseDetailStore.isOwner">
                        <button
                            class="add_button"
                            @click="courseDetailStore.isOpenAddCard = true"
                        >
                            Thêm thẻ mới
                        </button>
                    </div>
                </div>
            </div>
            <div class="course">
                <div class="course_left">
                    <div class="course_infor">
                        <label class="label" for="name">Tên khoá học</label>
                        <input
                            type="text"
                            id="name"
                            class="input"
                            :value="courseDetailStore.course.course.name"
                            @input="
                                courseDetailStore.course.course.name =
                                    $event.target.value
                            "
                            :disabled="!courseDetailStore.isOwner"
                        />
                    </div>
                    <div class="course_infor">
                        <label class="label" for="description">Mô tả</label>
                        <input
                            id="description"
                            class="input"
                            :value="courseDetailStore.course.course.description"
                            @input="
                                courseDetailStore.course.course.description =
                                    $event.target.value
                            "
                            :disabled="!courseDetailStore.isOwner"
                        />
                    </div>
                    <div class="course_infor">
                        <label class="label" for="author">Tác giả</label>
                        <input
                            id="author"
                            class="input"
                            :value="courseDetailStore.course.course.author"
                            disabled
                        />
                    </div>
                </div>
                <div class="course_right">
                    <label for="img" class="label">Hình ảnh</label>
                    <div
                        ref="img"
                        class="input_file img"
                        :style="{
                            backgroundImage: courseDetailStore.course.course.img
                                ? `url(/store/${courseDetailStore.course.course.img})`
                                : defaultImg,
                        }"
                        @click="imgInput.click()"
                    >
                        <input
                            ref="imgInput"
                            id="img"
                            :disabled="!courseDetailStore.isOwner"
                            type="file"
                            accept="image/*"
                            @change="handleUploadImg"
                        />
                    </div>
                </div>
            </div>
            <div class="card_list">
                <div
                    class="card"
                    v-for="card in courseDetailStore.course.cards"
                >
                    <CardDetail
                        :card="card"
                        @delete="
                            (id) => {
                                action.delete = 'card';
                                action.id = id;
                                warningText =
                                    'Bạn có chắc chắn muốn xóa thẻ này?';
                                showWarning = true;
                            }
                        "
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 400px;
    padding-top: 40px;
    gap: 40px;
    padding-bottom: 100px;
}

.top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    font-size: 36px;
    font-weight: 700;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    gap: 24px;
}

.delete_button {
    cursor: pointer;
}

.add_button {
    outline: none;
    border: none;
    background-color: var(--primary-color);
    color: #fff;
    padding: 12px 24px;
    border-radius: 15px;
    font-size: 16px;
    cursor: pointer;
}

.add_button:hover {
    background-color: #4b8edb;
}

.add_button:active {
    background-color: #2e5f8e;
}

.course {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.course_left {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: space-between;
}

.course_right {
    width: 45%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.label {
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-color);
}

.img {
    width: 100%;
    height: 250px;
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

.input {
    outline: none;
    border: 1px solid #4b8edb;
    padding: 0 12px;
    height: 54px;
    width: 100%;
    font-size: 16px;
    border-radius: 15px;
    background-color: #f0faff;
    color: var(--primary-color);
}

.course_infor {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.card_list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 1000px;
    overflow-y: auto;
    padding: 4px;
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-thumb {
    background: #d3e7f2;
    border-radius: 999999999px;
}

.top_button {
    display: flex;
    gap: 24px;
}
</style>
