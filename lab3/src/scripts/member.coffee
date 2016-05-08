$ -> $("#navbar-member").addClass 'active'

$ ->
    $ ".member"
        .not("#luan-yun-teng")
        .click (e) -> do e.preventDefault
        .click -> alert "本次作业没有实现该页面"
