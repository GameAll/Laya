/*
* name;
*/
var SceneManager = (function () {

    function SceneManager() {
        this.__super.call(this);
        this._scenes = {};
        this._currScene = null;
    }

    Laya.class(SceneManager, "SceneManager", BaseClass);
    var _proto_ = SceneManager.prototype;

    /**
     * 清空处理
     */
    _proto_.clear = function() {
        var nowScene = this._scenes[this._currScene];
        if(nowScene){
            nowScene.onExit();
            this._currScene = null;
        }
        this._scenes = {};
    }

    /**
     * 注册Scene
     * @param key Scene唯一标识 {any}
     * @param scene Scene对象 {BaseScene}
     */
    _proto_.register = function(key, scene) {
        this._scenes[key] = scene;
    }

    /**
     * 切换场景
     * @param key 场景唯一标识 {any}
     */
    _proto_.runScene = function(key) {
        var nowScene = this._scenes[key];
        if (nowScene == null) {
            Logger.trace("场景" + key + "不存在");
            return;
        }

        var oldScene = this._scenes[this._currScene];
        if (oldScene) {
            oldScene.onExit();
        }

        nowScene.onEnter();
        this._currScene = key;
    }

    /**
     * 获取当前Scene
     * @returns {any}
     */
    _proto_.getCurrScene = function() {
        return this._currScene;
    }

    return SceneManager;
}());