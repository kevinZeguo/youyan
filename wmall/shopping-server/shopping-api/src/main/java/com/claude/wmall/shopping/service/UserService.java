package com.claude.wmall.shopping.service;

import java.util.List;

import com.claude.wmall.shopping.domain.User;

public interface UserService extends CrudService<User> {

    //保存用户
    public void save(User user);

    //通过name获取user对象
    public boolean getUserByName(String name);

    //通过邮箱
    public boolean getUserByEmail(String email);

    //通过身份证号
    public boolean getUserByIdNumber(String idNumber);

    //通过手机号
    public boolean getUserByIdPhone(String phone);

    //通过登录名和密码
    public User getUserByLoginAndPass(String loginName, String loginPass);

    //通过登录名获得用户
    public User getUsersByName(String name);

    //通过ID查找用户
    public User getUserByID(Integer ID);

    public List<User> getUsersByType(String type);

    public User getUserByPhone(String phone);

    /**
     * 根据部门Id查询人员列表
     * @param deptId
     * @return
     */
    List<User> getListByDeptId(Integer deptId);
}
