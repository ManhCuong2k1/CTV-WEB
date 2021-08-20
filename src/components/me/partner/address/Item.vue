<template>
    <div class="flex justify-between">
        <div class="flex-grow">
            <el-row class="mb-2" :gutter="20">
                <el-col class="text-gray-500 text-right" :span="8">
                    Họ và tên
                </el-col>
                <el-col :span="16">
                    Lorem ipsum dolor
                </el-col>
            </el-row>
            <el-row class="mb-2" :gutter="20">
                <el-col class="text-gray-500 text-right" :span="8">
                    Số điện thoại
                </el-col>
                <el-col :span="16">
                    012 456 7890
                </el-col>
            </el-row>
            <el-row class="mb-2" :gutter="20">
                <el-col class="text-gray-500 text-right" :span="8">
                    Địa chỉ
                </el-col>
                <el-col :span="16">
                    <div>Tòa nhà Keangnam/Landmark 72</div>
                    <div>Phường Mễ Trì</div>
                    <div>Quận Nam Từ Liêm</div>
                    <div>Hà Nội</div>
                </el-col>
            </el-row>
        </div>
        <div class="flex flex-col items-end">
            <div class="flex">
                <el-button type="text">Sửa</el-button>
                <el-button type="text">Xóa</el-button>
            </div>
            <el-button size="small">
                Đặt làm mặc định
            </el-button>
        </div>
    </div>
</template>
