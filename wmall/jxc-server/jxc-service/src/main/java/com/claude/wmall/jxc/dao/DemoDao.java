package com.claude.wmall.jxc.dao;

import com.claude.wmall.jxc.domain.DemoUser;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by mazeguo on 2016/7/17.
 */
public interface DemoDao {
    /**
     * 保存用户
     * @param user
     * @throws Exception
     */
    void insert(DemoUser user)throws Exception;

    /**
     * 根据用户Id查询用户信息
     * @param userId
     * @return
     * @throws Exception
     */
    DemoUser selectById(Integer userId)throws Exception;

    /**
     * 更新用户信息
     * @param demoUser
     * @throws Exception
     */
    void updateById(DemoUser demoUser)throws Exception;


    /**
     * 根据Id删除用户信息
     * @param userId
     * @throws Exception
     */
    void deleteById(Integer userId)throws Exception;

    /**
     * 根据用户信息查询用户列表
     * 可以传一个对象，或是多个参数
     * @param userName
     * @param age
     * @return
     * @throws Exception
     */
    List<DemoUser> selectList(@Param("userName")String userName, @Param("age")Integer age)throws Exception;
}
