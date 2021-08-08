<template>
    <div>
        <div class="footer bg-footer text-white pt-11">
            <div class="max-w-screen-lg mx-auto px-4 lg:px-0 main-content">
                <div
                    class="grid grid-cols-2 gap-7 md:grid-cols-4 lg:grid-cols-12 md:gap-20 border-b border-custom-2 pb-5"
                >
                    <div class="md:col-span-1 lg:col-span-2">
                        <div class="text-base font-bold pb-2">
                            Nội dung
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Blog
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Review
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Tóm tắt
                        </div>
                    </div>
                    <div class="md:col-span-1 lg:col-span-2">
                        <div class="text-base font-bold pb-2">
                            Danh mục
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Blog
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Review
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Tóm tắt
                        </div>
                    </div>
                    <div class="col-span-2 md:col-span-1 lg:col-span-2">
                        <div class="text-base font-bold pb-2">
                            Dịch vụ
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Blog
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Review
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Tóm tắt
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Blog
                        </div>
                    </div>
                    <div class="col-span-3 md:col-span-2 lg:col-span-3">
                        <div>
                            <div class="text-base font-bold pb-7">
                                Theo dõi
                            </div>
                            <div
                                class="border-b border-dashed pb-6 border-custom-2"
                            >
                                <div class="flex items-center">
                                    <div class="mr-5">
                                        <img
                                            src="/images/icons/facebook.svg"
                                            alt=""
                                        >
                                    </div>
                                    <div class="mr-5">
                                        <img
                                            src="/images/icons/instagram.svg"
                                            alt=""
                                        >
                                    </div>
                                    <div class="mr-5">
                                        <img
                                            src="/images/icons/twitter.svg"
                                            alt=""
                                        >
                                    </div>
                                    <div class="mr-5">
                                        <img
                                            src="/images/icons/youtube.svg"
                                            alt=""
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="text-base font-bold py-4">
                                Nhận thông tin
                            </div>
                            <div
                                class="border border-custom-2 flex items-center"
                            >
                                <input
                                    type="text"
                                    class="bg-transparent h-9 w-full px-2 focus:outline-none"
                                    placeholder="Nhập email"
                                >
                                <div
                                    class="px-3 btn-send border-l border-custom-2 color-custom-2 hover-color-primary cursor-pointer"
                                >
                                    Gửi
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-3 md:col-span-2 lg:col-span-3">
                        <div class="text-base font-bold pb-2">
                            Fanpage
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Blog
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Review
                        </div>
                        <div class="pt-5 hover-color-primary cursor-pointer">
                            Tóm tắt
                        </div>
                    </div>
                </div>
                <div
                    class="flex flex-wrap items-center justify-between py-6 lg:flex-nowrap"
                >
                    <div class="flex-1 sm:flex-auto mb-2 md:mb-0">
                        © 2021 Bản quyền thuộc
                        <span class="font-bold"> MyWebsite.vn</span>
                    </div>
                    <div>
                        <div class="tabs">
                            <div class="tabs__list flex flex-wrap">
                                <div class="tabs__item px-3">
                                    <a href="#" class="tabs__link hover-color-primary cursor-pointer"> RSS </a>
                                </div>
                                <div class="tabs__item px-3">
                                    <a href="#" class="tabs__link hover-color-primary cursor-pointer">
                                        Điều khoản sử dụng
                                    </a>
                                </div>
                                <div class="tabs__item px-3">
                                    <a href="#" class="tabs__link hover-color-primary cursor-pointer">
                                        Giới thiệu
                                    </a>
                                </div>
                                <div class="tabs__item px-3 flex">
                                    <span class="tabs__link">
                                        <a href="tel:+0982624805">
                                            Hotline:
                                            <span
                                                class="color-custom-2 font-bold hover-color-primary cursor-pointer"
                                            >098 262 48 05</span></a>
                                        <span> - </span>
                                        <a href="mailto:info@MyWebsite.vn">
                                            Email:
                                            <span
                                                class="color-primary italic cursor-pointer"
                                            >info@MyWebsite.vn</span>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="socialMedia fixed z-20">
            <!-- <div class="messenger">
                <a href="">
                    <img src="/images/icons/messenger-btn.svg" alt="">
                </a>
            </div> -->
            <div class="phone">
                <a href="tel:+0982624805">
                    <img src="/images/icons/phone.svg" alt="">
                </a>
            </div>
        </div>

        <div
            class="return-to-top hidden md:block fixed rounded-full z-40 cursor-pointer opacity-0 duration-300 transition-all"
        >
            <img src="/images/icons/scroll-top.svg" alt="" class="">
        </div>
    </div>
</template>

<script>
    export default {};
</script>
