package com.claude.wmall.commons.utils;

import java.io.PrintStream;

public class XMLHelperException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5355057660882162207L;
	private Exception innerException;

	public XMLHelperException() {
		super();
		innerException = null;
	}

	public XMLHelperException(String message) {
		super(message);
		innerException = null;
	}

	public XMLHelperException(String message, Exception innerException) {
		super(message);
		this.innerException = innerException;
	}

	public String getMessage() {
		String message = super.getMessage() + "\n"
				+ (innerException == null ? "" : innerException.getMessage());

		// super.printStackTrace(System.err);
		return message;
	}

	public void printStackTrace(PrintStream ps) {
		super.printStackTrace(ps);
		innerException.printStackTrace(ps);
	}
}
