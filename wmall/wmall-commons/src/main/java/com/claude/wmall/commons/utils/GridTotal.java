package com.claude.wmall.commons.utils;

import java.util.List;

public class GridTotal {

	private int totalSize; // 共有多少条数据

	public final int getTotalSize() {
		return totalSize;
	}

	public final void setTotalSize(int totalSize) {
		this.totalSize = totalSize;
	}

	private List rows;

	private List footer;

	public List getFooter() {
		return footer;
	}

	public void setFooter(List footer) {
		this.footer = footer;
	}

	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}
}
