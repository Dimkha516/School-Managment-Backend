/*
  Warnings:

  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `test`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'teacher', 'student') NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `last_login` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    INDEX `users_role_idx`(`role`),
    INDEX `users_is_active_idx`(`is_active`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `description` TEXT NULL,
    `duration` VARCHAR(50) NULL,
    `level` VARCHAR(50) NULL,
    `status` ENUM('active', 'inactive', 'archived') NOT NULL DEFAULT 'active',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `programs_code_key`(`code`),
    INDEX `programs_code_idx`(`code`),
    INDEX `programs_status_idx`(`status`),
    INDEX `programs_level_idx`(`level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `registration_number` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `birth_date` DATE NULL,
    `gender` ENUM('M', 'F') NOT NULL,
    `address` TEXT NULL,
    `photo_url` VARCHAR(500) NULL,
    `program_id` INTEGER NULL,
    `level` VARCHAR(50) NULL,
    `status` ENUM('active', 'inactive', 'suspended', 'graduated') NOT NULL DEFAULT 'active',
    `enrollment_date` DATE NOT NULL,
    `academic_year` VARCHAR(20) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `students_user_id_key`(`user_id`),
    UNIQUE INDEX `students_registration_number_key`(`registration_number`),
    UNIQUE INDEX `students_email_key`(`email`),
    INDEX `students_registration_number_idx`(`registration_number`),
    INDEX `students_program_id_idx`(`program_id`),
    INDEX `students_status_idx`(`status`),
    INDEX `students_last_name_first_name_idx`(`last_name`, `first_name`),
    INDEX `students_program_id_status_idx`(`program_id`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `registration_number` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `title` VARCHAR(50) NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `photo_url` VARCHAR(500) NULL,
    `specialty` VARCHAR(200) NULL,
    `degree` VARCHAR(200) NULL,
    `hire_date` DATE NOT NULL,
    `status` ENUM('permanent', 'contract', 'temporary') NOT NULL DEFAULT 'contract',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `teachers_user_id_key`(`user_id`),
    UNIQUE INDEX `teachers_registration_number_key`(`registration_number`),
    UNIQUE INDEX `teachers_email_key`(`email`),
    INDEX `teachers_registration_number_idx`(`registration_number`),
    INDEX `teachers_status_idx`(`status`),
    INDEX `teachers_last_name_first_name_idx`(`last_name`, `first_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `permissions` JSON NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `admins_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `description` TEXT NULL,
    `program_id` INTEGER NOT NULL,
    `teacher_id` INTEGER NULL,
    `credits` INTEGER NOT NULL DEFAULT 0,
    `hours` INTEGER NOT NULL DEFAULT 0,
    `semester` INTEGER NULL,
    `status` ENUM('planned', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'planned',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `courses_code_key`(`code`),
    INDEX `courses_code_idx`(`code`),
    INDEX `courses_program_id_idx`(`program_id`),
    INDEX `courses_teacher_id_idx`(`teacher_id`),
    INDEX `courses_semester_idx`(`semester`),
    INDEX `courses_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_number` VARCHAR(20) NOT NULL,
    `name` VARCHAR(200) NULL,
    `type` ENUM('Classroom', 'Laboratory', 'Auditorium', 'Meeting room') NOT NULL DEFAULT 'Classroom',
    `capacity` INTEGER NOT NULL DEFAULT 0,
    `equipment` JSON NULL,
    `building` VARCHAR(50) NULL,
    `floor` INTEGER NULL,
    `status` ENUM('available', 'occupied', 'maintenance', 'out_of_service') NOT NULL DEFAULT 'available',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `rooms_room_number_key`(`room_number`),
    INDEX `rooms_room_number_idx`(`room_number`),
    INDEX `rooms_status_idx`(`status`),
    INDEX `rooms_type_idx`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `program_id` INTEGER NOT NULL,
    `day_of_week` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
    `start_time` TIME(0) NOT NULL,
    `end_time` TIME(0) NOT NULL,
    `type` ENUM('lecture', 'practical', 'tutorial', 'exam') NOT NULL DEFAULT 'lecture',
    `semester` INTEGER NOT NULL,
    `academic_year` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `schedules_course_id_idx`(`course_id`),
    INDEX `schedules_day_of_week_idx`(`day_of_week`),
    INDEX `schedules_program_id_idx`(`program_id`),
    INDEX `schedules_academic_year_idx`(`academic_year`),
    INDEX `schedules_semester_idx`(`semester`),
    UNIQUE INDEX `schedules_room_id_day_of_week_start_time_academic_year_key`(`room_id`, `day_of_week`, `start_time`, `academic_year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `status` ENUM('present', 'absent', 'late', 'excused') NOT NULL DEFAULT 'present',
    `note` TEXT NULL,
    `arrival_time` TIME(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `attendance_student_id_idx`(`student_id`),
    INDEX `attendance_course_id_idx`(`course_id`),
    INDEX `attendance_date_idx`(`date`),
    INDEX `attendance_status_idx`(`status`),
    INDEX `attendance_date_status_idx`(`date`, `status`),
    UNIQUE INDEX `attendance_student_id_course_id_date_key`(`student_id`, `course_id`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assessments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `course_id` INTEGER NOT NULL,
    `program_id` INTEGER NOT NULL,
    `room_id` INTEGER NULL,
    `type` ENUM('exam', 'assignment', 'practical', 'continuous_assessment', 'oral') NOT NULL,
    `date` DATE NOT NULL,
    `start_time` TIME(0) NOT NULL,
    `end_time` TIME(0) NOT NULL,
    `duration` INTEGER NULL,
    `total_points` DECIMAL(5, 2) NOT NULL DEFAULT 20.00,
    `coefficient` INTEGER NOT NULL DEFAULT 1,
    `description` TEXT NULL,
    `status` ENUM('planned', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'planned',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `assessments_course_id_idx`(`course_id`),
    INDEX `assessments_date_idx`(`date`),
    INDEX `assessments_type_idx`(`type`),
    INDEX `assessments_status_idx`(`status`),
    INDEX `assessments_program_id_idx`(`program_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `assessment_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `grade` DECIMAL(5, 2) NULL,
    `max_points` DECIMAL(5, 2) NOT NULL DEFAULT 20.00,
    `coefficient` INTEGER NOT NULL DEFAULT 1,
    `assessment_date` DATE NOT NULL,
    `note` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `grades_student_id_idx`(`student_id`),
    INDEX `grades_assessment_id_idx`(`assessment_id`),
    INDEX `grades_course_id_idx`(`course_id`),
    INDEX `grades_student_id_course_id_idx`(`student_id`, `course_id`),
    UNIQUE INDEX `grades_student_id_assessment_id_key`(`student_id`, `assessment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `report_cards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `program_id` INTEGER NOT NULL,
    `level` VARCHAR(50) NOT NULL,
    `semester` INTEGER NOT NULL,
    `academic_year` VARCHAR(20) NOT NULL,
    `overall_average` DECIMAL(5, 2) NULL,
    `total_credits` INTEGER NOT NULL DEFAULT 0,
    `earned_credits` INTEGER NOT NULL DEFAULT 0,
    `honors` VARCHAR(50) NULL,
    `rank` INTEGER NULL,
    `status` ENUM('passed', 'failed', 'repeat', 'expelled') NOT NULL DEFAULT 'passed',
    `issue_date` DATE NULL,
    `grades_json` JSON NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `report_cards_student_id_idx`(`student_id`),
    INDEX `report_cards_semester_idx`(`semester`),
    INDEX `report_cards_academic_year_idx`(`academic_year`),
    INDEX `report_cards_status_idx`(`status`),
    UNIQUE INDEX `report_cards_student_id_semester_academic_year_key`(`student_id`, `semester`, `academic_year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `payment_type` VARCHAR(100) NOT NULL,
    `payment_method` ENUM('cash', 'mobile_money', 'transfer', 'check', 'card') NOT NULL,
    `reference` VARCHAR(100) NOT NULL,
    `installment` VARCHAR(50) NULL,
    `academic_year` VARCHAR(20) NOT NULL,
    `transaction_date` DATE NOT NULL,
    `due_date` DATE NULL,
    `status` ENUM('pending', 'approved', 'rejected', 'refunded') NOT NULL DEFAULT 'pending',
    `note` TEXT NULL,
    `receipt_url` VARCHAR(500) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `payments_reference_key`(`reference`),
    INDEX `payments_student_id_idx`(`student_id`),
    INDEX `payments_reference_idx`(`reference`),
    INDEX `payments_status_idx`(`status`),
    INDEX `payments_transaction_date_idx`(`transaction_date`),
    INDEX `payments_academic_year_idx`(`academic_year`),
    INDEX `payments_student_id_academic_year_idx`(`student_id`, `academic_year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `type` ENUM('info', 'exam', 'course', 'payment', 'meeting', 'urgent') NOT NULL DEFAULT 'info',
    `priority` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
    `recipients` JSON NOT NULL,
    `program_id` INTEGER NULL,
    `level` VARCHAR(50) NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expiration_date` TIMESTAMP(0) NULL,
    `status` ENUM('draft', 'sent', 'archived') NOT NULL DEFAULT 'draft',
    `author_id` INTEGER NULL,
    `read_count` INTEGER NOT NULL DEFAULT 0,
    `updated_at` TIMESTAMP(0) NOT NULL,

    INDEX `notifications_type_idx`(`type`),
    INDEX `notifications_status_idx`(`status`),
    INDEX `notifications_created_date_idx`(`created_date`),
    INDEX `notifications_program_id_idx`(`program_id`),
    INDEX `notifications_priority_idx`(`priority`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_reads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notification_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `read_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `notification_reads_notification_id_idx`(`notification_id`),
    INDEX `notification_reads_user_id_idx`(`user_id`),
    UNIQUE INDEX `notification_reads_notification_id_user_id_key`(`notification_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_program_id_fkey` FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admins` ADD CONSTRAINT `admins_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_program_id_fkey` FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_program_id_fkey` FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assessments` ADD CONSTRAINT `assessments_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assessments` ADD CONSTRAINT `assessments_program_id_fkey` FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assessments` ADD CONSTRAINT `assessments_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_assessment_id_fkey` FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `report_cards` ADD CONSTRAINT `report_cards_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `report_cards` ADD CONSTRAINT `report_cards_program_id_fkey` FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_program_id_fkey` FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification_reads` ADD CONSTRAINT `notification_reads_notification_id_fkey` FOREIGN KEY (`notification_id`) REFERENCES `notifications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification_reads` ADD CONSTRAINT `notification_reads_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
