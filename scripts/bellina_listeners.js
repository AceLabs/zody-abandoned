function SysListener_onTick() {
    var d = sys_platform.getGraphicsDevice().getIDraw();

    d.setColor( 0, 0, 0 );
    d.fillRect( 0, 0, 1023, 767 );

    blRender(sys_nody_root, d,[0,0]);

	d.swap();
}
