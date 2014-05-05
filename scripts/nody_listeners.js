function SysListener_onTick() {
    var d = sys_platform.getGraphicsDevice().getIDraw();

    blRender(Nody.root, d,[0,0]);

	d.swap();

	ndFire(Event.TICK);
}
