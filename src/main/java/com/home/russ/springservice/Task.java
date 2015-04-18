package com.home.russ.springservice;

import javax.persistence.*;
import java.sql.Date;


/**
 * Created by rray on 4/15/15.
 */
@Entity
@Table(name="task_list", schema="taskmanager")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="task_id")
    private Long taskId;

    @Column(name="task_name")
    private String taskName;

    @Column(name="task_description")
    private String taskDescription;

    @Column(name="task_priority")
    private String taskPriority;

    @Column(name="task_status")
    private String taskStatus;

    @Column(name="task_archived")
    private Boolean taskArchived = Boolean.FALSE;

    @Column(name="task_start_time")
    private Date taskStartTime;

    @Column(name="task_end_time")
    private Date taskEndTime;



    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public String getTaskPriority() {
        return taskPriority;
    }

    public void setTaskPriority(String taskPriority) {
        this.taskPriority = taskPriority;
    }

    public String getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus;
    }

    public Boolean isTaskArchived() {
        return taskArchived;
    }

    public void setTaskArchived(Boolean taskArchived) {
        this.taskArchived = taskArchived;
    }

    public Date getTaskStartTime() {
        return taskStartTime;
    }

    public void setTaskStartTime(Date taskStartTime) {
        this.taskStartTime = taskStartTime;
    }

    public Date getTaskEndTime() {
        return taskEndTime;
    }

    public void setTaskEndTime(Date taskEndTime) {
        this.taskEndTime = taskEndTime;
    }

    @Override
    public String toString() {
        return "Task [id=" + taskId.toString() + ", taskName=" + taskName
                + ", taskDescription=" + taskDescription + ", taskPriority="
                + taskPriority + ", taskStatus=" + taskStatus + "]";
    }

}
