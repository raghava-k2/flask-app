package com.kvr;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommentController {
	private String comment;

	@RequestMapping(value = "/api/v1/comment/", method = RequestMethod.GET)
	public String getComment() {
		return this.comment;
	}

	@RequestMapping(value = "/api/v1/comment", method = RequestMethod.PUT)
	public void updateComment(@RequestBody String comment) {
		this.comment = comment;
	}

}
