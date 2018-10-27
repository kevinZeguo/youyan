package com.claude.wmall.jxc.service;

import com.claude.wmall.jxc.domain.DemoUser;

import java.util.List;

/**
 * Created by mazeguo on 2016/7/17.
 */
public interface DemoService {

    /**
     * 保存用户
     * @param user
     * @throws Exception
     */
    void saveUser(DemoUser user)throws Exception;

    /**
     * 根据用户Id查询用户信息
     * @param userId
     * @return
     * @throws Exception
     */
    DemoUser findById(Integer userId )throws  Exception;

    /**
     * 修改用户信息
     * @param demoUser
     * @throws Exception
     */
    void modifyUser(DemoUser demoUser) throws Exception;

    /**
     * 删除用户信息
     * @param userId
     * @throws Exception
     */
    void removeUser(Integer userId) throws Exception;

    /**
     * 查询用户列表
     * @return
     * @throws Exception
     */
    List<DemoUser> findUserList()throws Exception;
}

