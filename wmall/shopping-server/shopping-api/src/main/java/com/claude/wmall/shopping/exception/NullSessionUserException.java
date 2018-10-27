package com.claude.wmall.shopping.exception;

public class NullSessionUserException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5504969571434603931L;
	
	public NullSessionUserException(){
		super();
	}
	
	public NullSessionUserException(String message){
		super(message);
	}

}