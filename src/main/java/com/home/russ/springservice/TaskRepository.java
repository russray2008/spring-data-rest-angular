package com.home.russ.springservice;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by rray on 4/15/15.
 */
@RepositoryRestResource
public interface TaskRepository extends CrudRepository<Task, Boolean> {

    //List<Task> findByTaskArchived(@Param("archivedfalse") Boolean taskArchivedFalse);
    List<Task> findByTaskArchived(@Param("isTaskArchived") Boolean taskArchivedFalse);
    List<Task> findByTaskStatus(@Param("status") String taskStatus);
}
