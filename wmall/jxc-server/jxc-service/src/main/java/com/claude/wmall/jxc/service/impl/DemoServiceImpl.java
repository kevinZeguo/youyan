package com.claude.wmall.jxc.service.impl;

import com.claude.wmall.jxc.dao.DemoDao;
import com.claude.wmall.jxc.domain.DemoUser;
import com.claude.wmall.jxc.service.DemoService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

/**
 * Created by mazeguo on 2016/7/17.
 */
@Service
public class DemoServiceImpl implements DemoService {
    private static final Log log = LogFactory.getLog(DemoServiceImpl.class);

    @Autowired
    private DemoDao demoDao;

    @Override
    public void saveUser(DemoUser user) throws Exception {
        demoDao.insert(user);
    }

    @Override
    public DemoUser findById(Integer userId) throws Exception {
        DemoUser user = demoDao.selectById(userId);
        return user;
    }

    @Override
    public void modifyUser(DemoUser demoUser) throws Exception {
        demoDao.updateById(demoUser);
    }

    @Override
    public void removeUser(Integer userId) throws Exception {
        demoDao.deleteById(userId);
    }

    @Override
    public List<DemoUser> findUserList() throws Exception {
        String userName = "abc";
        Integer age = 12;
        List<DemoUser> users = demoDao.selectList(userName,12);
        return users;
    }
}
