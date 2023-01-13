

class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    public sub(v: Vector2): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    public mul(v: Vector2): Vector2 {
        return new Vector2(this.x * v.x, this.y * v.y);
    }

    public div(v: Vector2): Vector2 {
        return new Vector2(this.x / v.x, this.y / v.y);
    }

    public addScalar(s: number): Vector2 {
        return new Vector2(this.x + s, this.y + s);
    }

    public subScalar(s: number): Vector2 {
        return new Vector2(this.x - s, this.y - s);
    }

    public abs() {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    //magnitude, normalizy
    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normalize(): Vector2 {
        let magnitude = this.magnitude();
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }

    public round(): Vector2 {
        return new Vector2(Math.round(this.x), Math.round(this.y));
    }

    public valueOf(): Vector2 {
        return this;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    public static get zero(): Vector2 {
        return new Vector2(0, 0);
    }

    public static get one(): Vector2 {
        return new Vector2(1, 1);
    }

    public static get up(): Vector2 {
        return new Vector2(0, 1);
    }

    public static get down(): Vector2 {
        return new Vector2(0, -1);
    }

    public static get left(): Vector2 {
        return new Vector2(-1, 0);
    }

    public static get right(): Vector2 {
        return new Vector2(1, 0);
    }

    public static get positiveInfinity(): Vector2 {
        return new Vector2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    }

    public static get negativeInfinity(): Vector2 {
        return new Vector2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    }

    public static get NaN(): Vector2 {
        return new Vector2(Number.NaN, Number.NaN);
    }

    public static get epsilon(): Vector2 {
        return new Vector2(Number.EPSILON, Number.EPSILON);
    }

}

export default Vector2;