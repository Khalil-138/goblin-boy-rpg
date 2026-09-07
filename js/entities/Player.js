class Player {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.width = 32;
        this.height = 32;

        this.speed = 4;

        this.dx = 0;
        this.dy = 0;
    }

    setDirection(dx, dy) {

        this.dx = dx;
        this.dy = dy;

    }

    getNormalizedDirection() {

        let dx = this.dx;
        let dy = this.dy;

        if (dx === 0 && dy === 0) {
            return { dx: 0, dy: 0 };
        }

        const length = Math.sqrt(dx * dx + dy * dy);

        return {
            dx: dx / length,
            dy: dy / length
        };

    }

    move(dx, dy, canMoveTo) {

    const newX = this.x + dx * this.speed;
    const newY = this.y + dy * this.speed;

    if (canMoveTo(newX, this.y)) {
        this.x = newX;
    }

    if (canMoveTo(this.x, newY)) {
        this.y = newY;
    }

}

    draw(ctx, camera) {

        ctx.fillStyle = "purple";

        ctx.fillRect(
            this.x - camera.x,
            this.y - camera.y,
            this.width,
            this.height
        );

    }

}

export { Player };