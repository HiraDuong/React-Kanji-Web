import { contract, execute } from "./AbiConfig";

import { Card } from "./Class";

/**
 * Lấy danh sách thẻ theo mã khóa học
 * @param {string} courseId
 * @returns {Card[]} Danh sách thẻ học
 */
async function getCardsByCourse(courseId) {
    var cards = await contract.getCardsByCourse(courseId);

    cards = cards.map((card) => {
        return new Card(card);
    });

    return cards;
}

/**
 * Tạo thẻ học mới
 * @param {string} word Từ vựng
 * @param {string} meaning Nghĩa
 * @param {string} example Ví dụ
 * @param {string} courseId Mã khóa học
 * @param {string} img Hình ảnh
 */
async function createCard(word, meaning, example, courseId, img) {
    var tx = await contract.createCard(word, meaning, example, courseId, img);

    // Đợi giao dịch được xác nhận
    await tx.wait();
}

/**
 * Chỉnh sửa thẻ học
 * @param {string} id Id card
 * @param {string} word Từ vựng
 * @param {string} meaning Nghĩa
 * @param {string} example Ví dụ
 * @param {string} img Hình ảnh
 */
async function updateCard(id, word, meaning, example, img) {
    var tx = await contract.updateCard(id, word, meaning, example, img);

    // Đợi giao dịch được xác nhận
    await tx.wait();
}

/**
 * Xóa thẻ học
 * @param {string} id Id card
 */
async function deleteCard(id) {
    var tx = await contract.deleteCard(id);

    // Đợi giao dịch được xác nhận
    await tx.wait();
}

/**
 * Xem danh sách thẻ học của người dùng hiện tại
 * @returns {Card[]} Danh sách thẻ học của người dùng hiện tại
 */
async function getUserCards() {
    var cards = await contract.getUserCards();

    cards = cards.map((card) => {
        return new Card(card);
    });
    return cards;
}

/**
 * Thêm card vào list card của người dùng hiện tại
 * @param {uint} id id card
 */
async function addUserCard(id) {
    var tx = await contract.addUserCard(id);

    // Đợi giao dịch được xác nhận
    await tx.wait();
}

/**
 * Xóa card khỏi list card của người dùng hiện tại
 * @param {uint} id id card
 */
async function removeUserCard(id) {
    var tx = await contract.removeUserCard(id);

    // Đợi giao dịch được xác nhận
    await tx.wait();
}

export default {
    /**
     * Lấy danh sách thẻ theo mã khóa học
     * @param {string} courseId
     * @returns {Card[]} Danh sách thẻ học
     */
    getCardsByCourse: async (courseId) =>
        await execute(getCardsByCourse, [courseId]),
    /**
     * Tạo thẻ học mới
     * @param {string} word Từ vựng
     * @param {string} meaning Nghĩa
     * @param {string} example Ví dụ
     * @param {string} courseId Mã khóa học
     * @param {string} img Hình ảnh
     */
    createCard: async (word, meaning, example, courseId, img) =>
        await execute(createCard, [word, meaning, example, courseId, img]),
    /**
     * Chỉnh sửa thẻ học
     * @param {string} id Id card
     * @param {string} word Từ vựng
     * @param {string} meaning Nghĩa
     * @param {string} example Ví dụ
     * @param {string} img Hình ảnh
     */
    updateCard: async (id, word, meaning, example, img) =>
        await execute(updateCard, [id, word, meaning, example, img]),
    /**
     * Xóa thẻ học
     * @param {string} id Id card
     */
    deleteCard: async (id) => await execute(deleteCard, [id]),
    /**
     * Xem danh sách thẻ học của người dùng hiện tại
     * @returns {Card[]} Danh sách thẻ học của người dùng hiện tại
     */
    getUserCards: async () => await execute(getUserCards),
    /**
     * Thêm card vào list card của người dùng hiện tại
     * @param {uint} id id card
     */
    addUserCard: async (id) => await execute(addUserCard, [id]),
    /**
     * Xóa card khỏi list card của người dùng hiện tại
     * @param {uint} id id card
     */
    removeUserCard: async (id) => await execute(removeUserCard, [id]),
};
