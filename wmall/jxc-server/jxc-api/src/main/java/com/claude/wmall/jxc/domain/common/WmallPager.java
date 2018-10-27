package com.claude.wmall.jxc.domain.common;

/**
 * Created by mazeguo on 2016/8/9.
 */
public class WmallPager {
	
    private Integer page = 1;
    private Integer rows = 20;
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getRows() {
		return rows;
	}
	public void setRows(Integer rows) {
		this.rows = rows;
	}
}
